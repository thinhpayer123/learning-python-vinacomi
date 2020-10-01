(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD is used - Register as an anonymous module.
        define(['jquery', 'gonrin'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'), require('gonrin'));
    } else {
        // Neither AMD nor CommonJS used. Use global variables.
        if (typeof jQuery === 'undefined') {
            throw 'gonrin.excel requires jQuery to be loaded first';
        }
        if (typeof gonrin === 'undefined') {
            throw 'gonrin.excel requires gonrin.core.js to be loaded first';
        }
        factory(jQuery, gonrin);
    }
}(function ($, gonrin) {
	'use strict';
	if (!gonrin) {
		throw 'gonrin.excel requires gonrin.core.js to be loaded first';
    }
	
	var Paths = {};
	
	/*XMLDOM*/
	var XMLDOM = function (ns, rootNodeName) {
        this.documentElement = this.createElement(rootNodeName);
        this.documentElement.setAttribute('xmlns', ns);
    };
    
    _.extend(XMLDOM.prototype, {
        createElement: function (name) {
            return new XMLDOM.XMLNode({
                nodeName: name
            });
        },
        createTextNode: function (text) {
            return new XMLDOM.TextNode(text);
        },
        toString: function () {
            return this.documentElement.toString();
        }
    });
    
    XMLDOM.Node = function () {};
    XMLDOM.Node.Create = function (config) {
        switch(config.type) {
            case "XML":
                return new XMLDOM.XMLNode(config);
            case "TEXT":
                return new XMLDOM.TextNode(config.nodeValue);
        }
    };
    
    XMLDOM.TextNode = function (text) {
        this.nodeValue = text;
    };
     _.extend(XMLDOM.TextNode.prototype, {
         toJSON: function () {
             return {
                 nodeValue: this.nodeValue,
                 type: 'TEXT'
             };
         },
        toString: function () {
            return _.escape(this.nodeValue);
        }
     });
    
    XMLDOM.XMLNode = function (config) {
        this.nodeName = config.nodeName;
        this.children = [];
        this.nodeValue = config.nodeValue || "";
        this.attributes = {};
        
        if(config.children) {
            for(var i = 0; i < config.children.length; i++) {
                this.appendChild(XMLDOM.Node.Create(config.children[i]));
            }
        }
        
        if(config.attributes) {
            for(var attr in config.attributes) {
                if(config.attributes.hasOwnProperty(attr)) {
                    this.setAttribute(attr, config.attributes[attr]);
                }
            }
        }
    };
    _.extend(XMLDOM.XMLNode.prototype, {
        
        toString: function () {
            var string = "<" + this.nodeName;
            var attrs = [];
            for(var attr in this.attributes) {
                if(this.attributes.hasOwnProperty(attr)) {
                    attrs.push(attr + "=\""+_.escape(this.attributes[attr])+"\"");
                }
            }
            if (attrs.length > 0){
                string+= " " + attrs.join(" ");
            }

            var childContent = "";
            for(var i = 0, l = this.children.length; i < l; i++) {
                childContent += this.children[i].toString();
            }

            if (childContent){
                string +=  ">" + childContent + "</" + this.nodeName + ">";
            } else {
                string += "/>";
            }

            return string;
        },
        
        toJSON: function () {
            var children = [];
            for(var i = 0, l = this.children.length; i < l; i++) {
                children.push(this.children[i].toJSON());
            }
            return {
                nodeName: this.nodeName,
                children: children,
                nodeValue: this.nodeValue,
                attributes: this.attributes,
                type: "XML"
            };
        },
        
        setAttribute: function (name, val) {
            if(val === null) {
                delete this.attributes[name];
                delete this[name];
                return;
            }
            this.attributes[name] = val;
            this[name] = val;
        },
        setAttributeNS: function (ns, name, val) {
            this.setAttribute(name, val);
        },
        appendChild: function (child) {
            this.children.push(child);
            this.firstChild = this.children[0];
        },
        cloneNode: function () {
            return new XMLDOM.XMLNode(this.toJSON());
        }
    });
    
    var util = {
            
            _idSpaces: {},
            
            /**
             * Returns a number based on a namespace. So, running with 'Picture' will return 1. Run again, you will get 2. Run with 'Foo', you'll get 1.
             * @param {String} space
             * @returns {Number}
             */
            uniqueId: function (space) {
                if(!this._idSpaces[space]) {
                    this._idSpaces[space] = 1;
                }
                return this._idSpaces[space]++;
            },
            
            /**
             * Attempts to create an XML document. Due to limitations in web workers, 
             * it may return a 'fake' xml document created from the XMLDOM.js file. 
             * 
             * Takes a namespace to start the xml file in, as well as the root element
             * of the xml file. 
             * 
             * @param {type} ns
             * @param {type} base
             * @returns {ActiveXObject|@exp;document@pro;implementation@call;createDocument|@new;XMLDOM}
             */
            createXmlDoc: function (ns, base) {
                if(typeof document === 'undefined') {
                    return new XMLDOM(ns || null, base, null);
                }
                if(document.implementation && document.implementation.createDocument) {
                    return document.implementation.createDocument(ns || null, base, null);
                } else if (window.ActiveXObject) {
                    var doc = new window.ActiveXObject( "Microsoft.XMLDOM" );
                    var rootNode = doc.createElement(base);
                    rootNode.setAttribute('xmlns', ns);
                    doc.appendChild(rootNode);
                    return doc;
                }
                throw "No xml document generator";
            },
            
            /**
             * Creates an xml node (element). Used to simplify some calls, as IE is
             * very particular about namespaces and such. 
             * 
             * @param {XMLDOM} doc An xml document (actual DOM or fake DOM, not a string)
             * @param {type} name The name of the element
             * @param {type} attributes
             * @returns {XML Node}
             */
            createElement: function (doc, name, attributes) {
                var el = doc.createElement(name);
                var ie = !el.setAttributeNS;
                attributes = attributes || [];
                var i = attributes.length;
                while (i--) {
                    if(!ie && attributes[i][0].indexOf('xmlns') !== -1) {
                        el.setAttributeNS("http://www.w3.org/2000/xmlns/", attributes[i][0], attributes[i][1]);
                    } else {
                        el.setAttribute(attributes[i][0], attributes[i][1]);
                    }
                }
                return el;
            },
            
            LETTER_REFS: {},
    	
            positionToLetterRef: function (x, y) {
                var digit = 1, index, num = x, string = "", alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                if(this.LETTER_REFS[x]) {
                    return this.LETTER_REFS[x].concat(y);
                }
                while (num > 0) {
                    num -= Math.pow(26, digit -1);
                    index = num % Math.pow(26, digit);
                    num -= index;
                    index = index / Math.pow(26, digit - 1);
                    string = alphabet.charAt(index) + string;
                    digit += 1;
                }
                this.LETTER_REFS[x] = string;
                return string.concat(y);
            },
    		
            schemas: {
                'worksheet': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet',
                'sharedStrings': "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",
                'stylesheet': "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
                'relationships': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
                'relationshipPackage': "http://schemas.openxmlformats.org/package/2006/relationships",
                'contentTypes': "http://schemas.openxmlformats.org/package/2006/content-types",
                'spreadsheetml': "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
                'markupCompat': "http://schemas.openxmlformats.org/markup-compatibility/2006",
                'x14ac': "http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac",
                'officeDocument': "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
                'package': "http://schemas.openxmlformats.org/package/2006/relationships",
                'table': "http://schemas.openxmlformats.org/officeDocument/2006/relationships/table",
                'spreadsheetDrawing': 'http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing',
                'drawing': 'http://schemas.openxmlformats.org/drawingml/2006/main',
                'drawingRelationship': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing',
                'image': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/image',
                'chart': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart'
            }
        };
    
    var RelationshipManager = function () {
        this.relations = {};
        this.lastId = 1;
    };
    
    _.uniqueId('rId'); //priming
    
    _.extend(RelationshipManager.prototype, {
        
        importData: function (data) {
            this.relations = data.relations;
            this.lastId = data.lastId;
        },
        exportData: function () {
            return {
                relations: this.relations,
                lastId: this.lastId
            };
        },
        
        addRelation: function (object, type) {
            this.relations[object.id] = {
                id: _.uniqueId('rId'),
                schema: util.schemas[type]
            };
            return this.relations[object.id].id;
        },
        
        getRelationshipId: function (object) {
            return this.relations[object.id] ? this.relations[object.id].id : null;
        },
		
        toXML: function () {
            var doc = util.createXmlDoc(util.schemas.relationshipPackage, 'Relationships');
            var relationships = doc.documentElement;
            
            _.each(this.relations, function (data, id) {
                var relationship = util.createElement(doc, 'Relationship', [
                    ['Id', data.id],
                    ['Type', data.schema],
                    ['Target', Paths[id]]
                ]);
                relationships.appendChild(relationship);
            });
            return doc;
        }
    });
    
    var sharedStrings = function () {
        this.strings = {};
        this.stringArray = [];
        this.id = _.uniqueId('SharedStrings');
    };
    _.extend(sharedStrings.prototype, {
        /**
         * Adds a string to the shared string file, and returns the ID of the 
         * string which can be used to reference it in worksheets.
         * 
         * @param string {String}
         * @return int
         */
        addString: function (string) {
            this.strings[string] = this.stringArray.length;
            this.stringArray[this.stringArray.length] = string;
            return this.strings[string];
        },
        
        exportData: function () {
            return this.strings;
        },
        
        toXML: function () {
            var doc = util.createXmlDoc(util.schemas.spreadsheetml, 'sst');
            var sharedStringTable = doc.documentElement;
            this.stringArray.reverse();
            var l = this.stringArray.length;
            sharedStringTable.setAttribute('count', l);
            sharedStringTable.setAttribute('uniqueCount', l);
            
            var template = doc.createElement('si');
            var templateValue = doc.createElement('t');
            templateValue.appendChild(doc.createTextNode('--placeholder--'));
            template.appendChild(templateValue);
            var strings = this.stringArray;
            
            while (l--) {
                var clone = template.cloneNode(true);
                clone.firstChild.firstChild.nodeValue = strings[l];
                sharedStringTable.appendChild(clone);
            }
            
            return doc;
        }
    });
    
    var Positioning = {
        /**
         * Converts pixel sizes to 'EMU's, which is what Open XML uses. 
         * 
         * @todo clean this up. Code borrowed from http://polymathprogrammer.com/2009/10/22/english-metric-units-and-open-xml/,
         * but not sure that it's going to be as accurate as it needs to be.
         * 
         * @param int pixels
         * @returns int
         */
        pixelsToEMUs: function (pixels) {
            return Math.round(pixels * 914400 / 96);
        }
    };
    
    var SharedStrings = function () {
        this.strings = {};
        this.stringArray = [];
        this.id = _.uniqueId('SharedStrings');
    };
    _.extend(SharedStrings.prototype, {
        /**
         * Adds a string to the shared string file, and returns the ID of the 
         * string which can be used to reference it in worksheets.
         * 
         * @param string {String}
         * @return int
         */
        addString: function (string) {
            this.strings[string] = this.stringArray.length;
            this.stringArray[this.stringArray.length] = string;
            return this.strings[string];
        },
        
        exportData: function () {
            return this.strings;
        },
        
        toXML: function () {
            var doc = util.createXmlDoc(util.schemas.spreadsheetml, 'sst');
            var sharedStringTable = doc.documentElement;
            this.stringArray.reverse();
            var l = this.stringArray.length;
            sharedStringTable.setAttribute('count', l);
            sharedStringTable.setAttribute('uniqueCount', l);
            
            var template = doc.createElement('si');
            var templateValue = doc.createElement('t');
            templateValue.appendChild(doc.createTextNode('--placeholder--'));
            template.appendChild(templateValue);
            var strings = this.stringArray;
            
            while (l--) {
                var clone = template.cloneNode(true);
                clone.firstChild.firstChild.nodeValue = strings[l];
                sharedStringTable.appendChild(clone);
            }
            
            return doc;
        }
    });
    
    var StyleSheet = function () {
        this.id = _.uniqueId('StyleSheet');
        this.cellStyles = [{
            name:"Normal", 
            xfId:"0", 
            builtinId:"0"
        }];
        this.defaultTableStyle = false;
        this.differentialStyles = [{}];
        this.masterCellFormats = [{
            numFmtId: 0, 
            fontId: 0, 
            fillId: 0, 
            borderId: 0, 
            xfid: 0
        }];
        this.masterCellStyles = [{
            numFmtId: 0, 
            fontId: 0, 
            fillId: 0, 
            borderId: 0
        }];
        this.fonts = [{}];
        this.numberFormatters = [];
        this.fills = [{}, {
            type: 'pattern', 
            patternType: 'white125', 
            fgColor: 'FFFFFF00', 
            bgColor: 'FFFFFF00'
        }];
        this.borders = [{
            top: {},
            left: {},
            right: {},
            bottom: {},
            diagonal: {}
        }];
        this.tableStyles = [];
    };
    _.extend(StyleSheet.prototype, {
        createSimpleFormatter: function (type) {
            var sid = this.masterCellFormats.length;
            var style = {
                id: sid
            };
            switch(type) {
                case 'date':
                    style.numFmtId = 14;
                    break;
            }
            this.masterCellFormats.push(style);
            return style;
        },

        createFill: function (fillInstructions) {
            var id = this.fills.length;
            var fill = fillInstructions;
            fill.id = id;
            this.fills.push(fill);
            return fill;
        },

        createNumberFormatter: function (formatInstructions) {
            var id = this.numberFormatters.length + 100;
            var format = {
                id: id,
                formatCode: formatInstructions
            };
            this.numberFormatters.push(format);
            return format;
        },

        /**
        * alignment: {
        *  horizontal: http://www.schemacentral.com/sc/ooxml/t-ssml_ST_HorizontalAlignment.html
        *  vertical: http://www.schemacentral.com/sc/ooxml/t-ssml_ST_VerticalAlignment.html
        *  @param {Object} styleInstructions
        */
        createFormat: function (styleInstructions) {
            var sid = this.masterCellFormats.length;
            var style = {
                id: sid
            };
            if(styleInstructions.font && _.isObject(styleInstructions.font)) {
                style.fontId = this.createFontStyle(styleInstructions.font).id;
            } else if(styleInstructions.font) {
                if(_.isNaN(parseInt(styleInstructions.font, 10))) {
                    throw "Passing a non-numeric font id is not supported";
                }
                style.fontId = styleInstructions.font;
            }

            if (styleInstructions.format && _.isString(styleInstructions.format)) {
                style.numFmtId = this.createNumberFormatter(styleInstructions.format).id;
            } else if(styleInstructions.format) {
                if(_.isNaN(parseInt(styleInstructions.format, 10))) {
                    throw "Invalid number formatter id";
                }
                style.numFmtId = styleInstructions.format;
            }

            if (styleInstructions.border && _.isObject(styleInstructions.border)) {
                style.borderId = this.createBorderFormatter(styleInstructions.border).id;
            } else if (styleInstructions.border) {
                if(_.isNaN(parseInt(styleInstructions.border, 10))) {
                    throw "Passing a non-numeric border id is not supported";
                }
                style.borderId = styleInstructions.border;
            }

            if (styleInstructions.fill && _.isObject(styleInstructions.fill)) {
                style.fillId = this.createFill(styleInstructions.fill).id;
            } else if (styleInstructions.fill) {
                if(_.isNaN(parseInt(styleInstructions.fill, 10))) {
                    throw "Passing a non-numeric fill id is not supported";
                }
                style.fillId = styleInstructions.fill;
            }

            if (styleInstructions.alignment && _.isObject(styleInstructions.alignment)) {
                style.alignment = _.pick(
                    styleInstructions.alignment,
                    'horizontal',
                    'justifyLastLine',
                    'readingOrder',
                    'relativeIndent',
                    'shrinkToFit',
                    'textRotation',
                    'vertical',
                    'wrapText'
                    );
            }

            this.masterCellFormats.push(style);
            return style;
        },
        
        createDifferentialStyle: function (styleInstructions) {
            var id = this.differentialStyles.length;
            var style = {
                id: id
            };
            if(styleInstructions.font && _.isObject(styleInstructions.font)) {
                style.font = styleInstructions.font;
            }
            if (styleInstructions.border && _.isObject(styleInstructions.border)) {
                style.border = _.defaults(styleInstructions.border, {
                    top: {},
                    left: {},
                    right: {},
                    bottom: {},
                    diagonal: {}
		});
            }
            if (styleInstructions.fill && _.isObject(styleInstructions.fill)) {
                style.fill = styleInstructions.fill;
            }
            if (styleInstructions.alignment && _.isObject(styleInstructions.alignment)) {
                style.alignment = styleInstructions.alignment;
            }
            if (styleInstructions.format && _.isString(styleInstructions.format)) {
                style.numFmt = styleInstructions.format;
            }
            this.differentialStyles[id] = style;
            return style;
        },
        
        /**
         * Should be an object containing keys that match with one of the keys from this list:
         * http://www.schemacentral.com/sc/ooxml/t-ssml_ST_TableStyleType.html
         * 
         * The value should be a reference to a differential format (dxf)
         * @param {Object} instructions
         */
        createTableStyle: function (instructions) {
            this.tableStyles.push(instructions);
        },
        
        /**
        * All params optional
        * Expects: {
        * top: {},
        * left: {},
        * right: {},
        * bottom: {},
        * diagonal: {},
        * outline: boolean,
        * diagonalUp: boolean,
        * diagonalDown: boolean
        * }
        * Each border should follow:
        * {
        * style: styleString, http://www.schemacentral.com/sc/ooxml/t-ssml_ST_BorderStyle.html
        * color: ARBG color (requires the A, so for example FF006666)
        * }
        * @param {Object} border
        */
        createBorderFormatter: function (border) {
            _.defaults(border, {
                top: {},
                left: {},
                right: {},
                bottom: {},
                diagonal: {},
                id: this.borders.length
            });
            this.borders.push(border);
            return border;
        },

        /**
        * Supported font styles:
        * bold
        * italic
        * underline (single, double, singleAccounting, doubleAccounting)
        * size
        * color
        * fontName
        * strike (strikethrough)
        * outline (does this actually do anything?)
        * shadow (does this actually do anything?)
        * superscript
        * subscript
        *
        * Color is a future goal - at the moment it's looking a bit complicated
        * @param {Object} instructions
        */
        createFontStyle: function (instructions) {
            var fontId = this.fonts.length;
            var fontStyle = {
                id: fontId
            };
            if(instructions.bold) {
                fontStyle.bold = true;
            }
            if(instructions.italic) {
                fontStyle.italic = true;
            }
            if(instructions.superscript) {
                fontStyle.vertAlign = 'superscript';
            }
            if(instructions.subscript) {
                fontStyle.vertAlign = 'subscript';
            }
            if(instructions.underline) {
                if(_.indexOf([
                    'double',
                    'singleAccounting',
                    'doubleAccounting'
                    ], instructions.underline) !== -1) {
                    fontStyle.underline = instructions.underline;
                } else {
                    fontStyle.underline = true;
                }
            }
            if(instructions.strike) {
                fontStyle.strike = true;
            }
            if(instructions.outline) {
                fontStyle.outline = true;
            }
            if(instructions.shadow) {
                fontStyle.shadow = true;
            }
            if(instructions.size) {
                fontStyle.size = instructions.size;
            }
            if(instructions.color) {
                fontStyle.color = instructions.color;
            }
            if(instructions.fontName) {
                fontStyle.fontName = instructions.fontName;
            }
            this.fonts.push(fontStyle);
            return fontStyle;
        },

        exportBorders: function (doc) {
            var borders = doc.createElement('borders');
            borders.setAttribute('count', this.borders.length);
            
            for(var i = 0, l = this.borders.length; i < l; i++) {
                borders.appendChild(this.exportBorder(doc, this.borders[i]));
            }
            return borders;
        },

        exportBorder: function (doc, data) {
            var border = doc.createElement('border');
            var self = this;
            var borderGenerator = function (name) {
                var b = doc.createElement(name);
                if(data[name].style) {
                    b.setAttribute('style', data[name].style);
                }
                if(data[name].color) {
                    b.appendChild(self.exportColor(doc, data[name].color));
                }
                return b;
            };
            border.appendChild(borderGenerator('left'));
            border.appendChild(borderGenerator('right'));
            border.appendChild(borderGenerator('top'));
            border.appendChild(borderGenerator('bottom'));
            border.appendChild(borderGenerator('diagonal'));
            return border;
        },

        exportColor: function (doc, color) {
            var colorEl = doc.createElement('color');
            if(_.isString(color)) {
                colorEl.setAttribute('rgb', color);
                return colorEl;
            }

            if (!_.isUndefined(color.tint)) { 
                colorEl.setAttribute('tint', color.tint);
            }
            if (!_.isUndefined(color.auto)) { 
                colorEl.setAttribute('auto', !!color.auto);
            }
            if (!_.isUndefined(color.theme)) { 
                colorEl.setAttribute('theme', color.theme);
            }

            return colorEl;
        },

        exportMasterCellFormats: function (doc) {
            var cellFormats = util.createElement(doc, 'cellXfs', [
                ['count', this.masterCellFormats.length]
                ]);
            for(var i = 0, l = this.masterCellFormats.length; i < l; i++) {
                var mformat = this.masterCellFormats[i];
                cellFormats.appendChild(this.exportCellFormatElement(doc, mformat));
            }
            return cellFormats;
        },

        exportMasterCellStyles: function (doc) {
            var records = util.createElement(doc, 'cellStyleXfs', [
                ['count', this.masterCellStyles.length]
                ]);
            for(var i = 0, l = this.masterCellStyles.length; i < l; i++) {
                var mstyle = this.masterCellStyles[i];
                records.appendChild(this.exportCellFormatElement(doc, mstyle));
            }
            return records;
        },

        exportCellFormatElement: function (doc, styleInstructions) {
            var xf = doc.createElement('xf');
            var allowed = ['applyAlignment', 'applyBorder', 'applyFill', 'applyFont', 'applyNumberFormat', 
            'applyProtection', 'borderId', 'fillId', 'fontId', 'numFmtId', 'pivotButton', 'quotePrefix', 'xfId'];
            var attributes = _.filter(_.keys(styleInstructions), function (key) {
                if(_.indexOf(allowed, key) !== -1) {
                    return true;
                }
            });
            if(styleInstructions.alignment) {
                var alignmentData = styleInstructions.alignment;
                xf.appendChild(this.exportAlignment(doc, alignmentData));
            }
            var a = attributes.length;
            while(a--) {
                xf.setAttribute(attributes[a], styleInstructions[attributes[a]]);
            }
            if (styleInstructions.fillId) {
                xf.setAttribute('applyFill', '1');
            }
            if (styleInstructions.fontId) {
                xf.setAttribute('applyFont', '1');
            }
            if (styleInstructions.borderId) {
                xf.setAttribute('applyBorder', '1');
            }
            if (styleInstructions.alignment) {
                xf.setAttribute('applyAlignment', '1');
            }
            if (styleInstructions.numFmtId) {
                xf.setAttribute('applyNumberFormat', '1');
            }
            return xf;
        },
        
        exportAlignment: function (doc, alignmentData) {
            var alignment = doc.createElement('alignment');
            var keys = _.keys(alignmentData);
            for(var i = 0, l = keys.length; i < l; i++) {
                alignment.setAttribute(keys[i], alignmentData[keys[i]]);
            }
            return alignment;
        },
        
        exportFonts: function (doc) {
            var fonts = doc.createElement('fonts');
            fonts.setAttribute('count', this.fonts.length);
            for(var i = 0, l = this.fonts.length; i < l; i++) {
                var fd = this.fonts[i];
                fonts.appendChild(this.exportFont(doc, fd));
            }
            return fonts;
        },
        
        exportFont: function (doc, fd) {
            var font = doc.createElement('font');
            if(fd.size) {
                var size = doc.createElement('sz');
                size.setAttribute('val', fd.size);
                font.appendChild(size);
            }

            if(fd.fontName) {
                var fontName = doc.createElement('name');
                fontName.setAttribute('val', fd.fontName);
                font.appendChild(fontName);
            }

            if(fd.bold) {
                font.appendChild(doc.createElement('b'));
            }
            if(fd.italic) {
                font.appendChild(doc.createElement('i'));
            }
            if(fd.vertAlign) {
                var vertAlign = doc.createElement('vertAlign');
                vertAlign.setAttribute('val', fd.vertAlign);
                font.appendChild(vertAlign);
            }
            if(fd.underline) { 
                var u = doc.createElement('u');
                if(fd.underline !== true) {
                    u.setAttribute('val', fd.underline);
                }
                font.appendChild(u); 
            }
            if(fd.strike) {
                font.appendChild(doc.createElement('strike'));
            }
            if(fd.shadow) {
                font.appendChild(doc.createElement('shadow'));
            }
            if(fd.outline) {
                font.appendChild(doc.createElement('outline'));
            }
            if(fd.color) {
                font.appendChild(this.exportColor(doc, fd.color));
            }
            return font;
        },

        exportFills: function (doc) {
            var fills = doc.createElement('fills');
            fills.setAttribute('count', this.fills.length);
            for(var i = 0, l = this.fills.length; i < l; i++) {
                var fd = this.fills[i];
                fills.appendChild(this.exportFill(doc, fd));
            }
            return fills;
        },
        
        exportFill: function (doc, fd) {
            var fillDef;
            var fill = doc.createElement('fill');
            if (fd.type === 'pattern') {
                fillDef = this.exportPatternFill(doc, fd);
                fill.appendChild(fillDef);
            } else if (fd.type === 'gradient') {
                fillDef = this.exportGradientFill(doc, fd);
                fill.appendChild(fillDef);
            }
            return fill;
        },
        
        exportGradientFill: function (doc, data) {
            var fillDef = doc.createElement('gradientFill');
            if(data.degree) {
                fillDef.setAttribute('degree', data.degree);
            } else if (data.left) {
                fillDef.setAttribute('left', data.left);
                fillDef.setAttribute('right', data.right);
                fillDef.setAttribute('top', data.top);
                fillDef.setAttribute('bottom', data.bottom);
            }
            var start = doc.createElement('stop');
            start.setAttribute('position', data.start.pureAt || 0);
            var startColor = doc.createElement('color');
            if (typeof data.start === 'string' || data.start.color) {
                startColor.setAttribute('rgb', data.start.color || data.start);
            } else if (typeof data.start.theme) {
                startColor.setAttribute('theme', data.start.theme);
            }
            
            var end = doc.createElement('stop');
            var endColor = doc.createElement('color');
            end.setAttribute('position', data.end.pureAt || 1);
            if (typeof data.start === 'string' || data.end.color) {
                endColor.setAttribute('rgb', data.end.color || data.end);
            } else if (typeof data.end.theme) {
                endColor.setAttribute('theme', data.end.theme);
            }
            start.appendChild(startColor);
            end.appendChild(endColor);
            fillDef.appendChild(start);
            fillDef.appendChild(end);
            return fillDef;
        },
        
        /**
        * Pattern types: http://www.schemacentral.com/sc/ooxml/t-ssml_ST_PatternType.html
        * @param {XMLDoc} doc
        * @param {Object} data
        */
        exportPatternFill: function (doc, data) {
            var fillDef = util.createElement(doc, 'patternFill', [
                ['patternType', data.patternType]
                ]);
            if(!data.bgColor) {
                data.bgColor = 'FFFFFFFF';
            }
            if(!data.fgColor) {
                data.fgColor = 'FFFFFFFF';
            }

            var bgColor = doc.createElement('bgColor');
            if(_.isString(data.bgColor)) {
                bgColor.setAttribute('rgb', data.bgColor);
            } else {
                if(data.bgColor.theme) {
                    bgColor.setAttribute('theme', data.bgColor.theme);
                } else {
                    bgColor.setAttribute('rgb', data.bgColor.rbg);
                }
            }

            var fgColor = doc.createElement('fgColor');
            if(_.isString(data.fgColor)) {
                fgColor.setAttribute('rgb', data.fgColor);
            } else {
                if(data.fgColor.theme) {
                    fgColor.setAttribute('theme', data.fgColor.theme);
                } else {
                    fgColor.setAttribute('rgb', data.fgColor.rbg);
                }
            }
            fillDef.appendChild(fgColor);
            fillDef.appendChild(bgColor);
            return fillDef;
        },

        exportNumberFormatters: function (doc) {
            var formatters = doc.createElement('numFmts');
            formatters.setAttribute('count', this.numberFormatters.length);
            for(var i = 0, l = this.numberFormatters.length; i < l; i++) {
                var fd = this.numberFormatters[i];
                formatters.appendChild(this.exportNumberFormatter(doc, fd));
            }
            return formatters;
        },
        
        exportNumberFormatter: function (doc, fd) {
            var numFmt = doc.createElement('numFmt');
            numFmt.setAttribute('numFmtId', fd.id);
            numFmt.setAttribute('formatCode', fd.formatCode);
            return numFmt;
        },

        exportCellStyles: function (doc) {
            var cellStyles = doc.createElement('cellStyles');
            cellStyles.setAttribute('count', this.cellStyles.length);

            for(var i = 0, l = this.cellStyles.length; i < l; i++) {
                var style = this.cellStyles[i];
                delete style.id; //Remove internal id
                var record = util.createElement(doc, 'cellStyle');
                cellStyles.appendChild(record);
                var attributes = _.keys(style);
                var a = attributes.length;
                while(a--) {
                    record.setAttribute(attributes[a], style[attributes[a]]);
                }
            }

            return cellStyles;
        },

        exportDifferentialStyles: function (doc) {
            var dxfs = doc.createElement('dxfs');
            dxfs.setAttribute('count', this.differentialStyles.length);

            for(var i = 0, l = this.differentialStyles.length; i < l; i++) {
                var style = this.differentialStyles[i];
                dxfs.appendChild(this.exportDFX(doc, style));
            }

            return dxfs;
        },
        
        exportDFX: function (doc, style) {
            var dxf = doc.createElement('dxf');
            if(style.font) {
                dxf.appendChild(this.exportFont(doc, style.font));
            }
            if(style.fill) {
                dxf.appendChild(this.exportFill(doc, style.fill));
            }
	    if(style.border) {
                dxf.appendChild(this.exportBorder(doc, style.border));
            }
            if(style.numFmt) {
                dxf.appendChild(this.exportNumberFormatter(doc, style.numFmt));
            }
            if(style.alignment) {
                dxf.appendChild(this.exportAlignment(doc, style.alignment));
            }
            return dxf;
        },
        
        exportTableStyles: function (doc) {
            var tableStyles = doc.createElement('tableStyles');
            tableStyles.setAttribute('count', this.tableStyles.length);
            if(this.defaultTableStyle) {
                tableStyles.setAttribute('defaultTableStyle', this.defaultTableStyle);
            }
            for(var i = 0, l = this.tableStyles.length; i < l; i++) {
                tableStyles.appendChild(this.exportTableStyle(doc, this.tableStyles[i]));
            }
            return tableStyles;
        },
        
        exportTableStyle: function (doc, style) {
            var tableStyle = doc.createElement('tableStyle');
            tableStyle.setAttribute('name', style.name);
            tableStyle.setAttribute('pivot', 0);
            var i = 0;
            
            _.each(style, function (value, key) {
                if(key === 'name') {return;}
                i++;
                var styleEl = doc.createElement('tableStyleElement');
                styleEl.setAttribute('type', key);
                styleEl.setAttribute('dxfId', value);
                tableStyle.appendChild(styleEl);
            });
            tableStyle.setAttribute('count', i);
            return tableStyle;
        },
        
        toXML: function () {
            var doc = util.createXmlDoc(util.schemas.spreadsheetml, 'styleSheet');
            var styleSheet = doc.documentElement;
            styleSheet.appendChild(this.exportNumberFormatters(doc));
            styleSheet.appendChild(this.exportFonts(doc));
            styleSheet.appendChild(this.exportFills(doc));
            styleSheet.appendChild(this.exportBorders(doc));
            styleSheet.appendChild(this.exportMasterCellStyles(doc));
            styleSheet.appendChild(this.exportMasterCellFormats(doc));
            styleSheet.appendChild(this.exportCellStyles(doc));
            styleSheet.appendChild(this.exportDifferentialStyles(doc));
            if(this.tableStyles.length) {
                styleSheet.appendChild(this.exportTableStyles(doc));
            }
            return doc;
        }
    });
    
    var Table = function (config) {
        _.defaults(this, {
            name: "",
            displayName: "",
            dataCellStyle: null,
            dataDfxId: null,
            headerRowBorderDxfId: null,
            headerRowCellStyle: null,
            headerRowCount: 1,
            headerRowDxfId: null,
            insertRow: false,
            insertRowShift: false,
            ref: null,
            tableBorderDxfId: null,
            totalsRowBorderDxfId: null,
            totalsRowCellStyle: null,
            totalsRowCount: 0,
            totalsRowDxfId: null,
            tableColumns: [],
            autoFilter: null,
            sortState: null,
            styleInfo: {}
        });
        this.initialize(config);
    };
    _.extend(Table.prototype, {
		
        initialize: function (config) {
            this.displayName = _.uniqueId("Table");
            this.name = this.displayName;
            this.id = this.name;
            this.tableId = this.id.replace('Table', '');
            _.extend(this, config);
        },
		
        setReferenceRange: function (start, end) {
            this.ref = [start, end];
        },
		
        setTableColumns: function (columns) {
        	var self = this;
            _.each(columns, function (column) {
            	self.addTableColumn(column);
            }, this);
        },
		
        /**
        * Expects an object with the following optional properties:
        * name (required)
        * dataCellStyle 
        * dataDxfId
        * headerRowCellStyle
        * headerRowDxfId
        * totalsRowCellStyle
        * totalsRowDxfId
        * totalsRowFunction
        * totalsRowLabel
        * columnFormula
        * columnFormulaIsArrayType (boolean)
        * totalFormula
        * totalFormulaIsArrayType (boolean)
        */
        addTableColumn: function (column) {
            if(_.isString(column)) {
                column = {
                    name: column
                };            
            }
            if(!column.name) {
                throw "Invalid argument for addTableColumn - minimum requirement is a name property";
            }
            this.tableColumns.push(column);
        },
		
        /**
        * Expects an object with the following properties:
        * caseSensitive (boolean)
        * dataRange
        * columnSort (assumes true)
        * sortDirection
        * sortRange (defaults to dataRange)
        */
        setSortState: function (state) {
            this.sortState = state;
        },
		
        toXML: function () {
            var doc = util.createXmlDoc(util.schemas.spreadsheetml, 'table');
            var table = doc.documentElement;
            table.setAttribute('id', this.tableId);
            table.setAttribute('name', this.name);
            table.setAttribute('displayName', this.displayName);
            var s = this.ref[0];
            var e = this.ref[1];
            table.setAttribute('ref', util.positionToLetterRef(s[0], s[1]) + ":" + util.positionToLetterRef(e[0], e[1]));
            
            /** TOTALS **/
            table.setAttribute('totalsRowCount', this.totalsRowCount);
            
            /** HEADER **/
            table.setAttribute('headerRowCount', this.headerRowCount);
            if(this.headerRowDxfId) {
                table.setAttribute('headerRowDxfId', this.headerRowDxfId);
            }
            if(this.headerRowBorderDxfId) {
                table.setAttribute('headerRowBorderDxfId', this.headerRowBorderDxfId);
            }
			
            if(!this.ref) {
                throw "Needs at least a reference range";
            }
            if(!this.autoFilter) {
                //this.addAutoFilter(this.ref[0], this.ref[1]);
            }
			
            table.appendChild(this.exportAutoFilter(doc));
			
            table.appendChild(this.exportTableColumns(doc));
            table.appendChild(this.exportTableStyleInfo(doc));
            return doc;
        },
		
        exportTableColumns: function (doc) {
            var tableColumns = doc.createElement('tableColumns');
            tableColumns.setAttribute('count', this.tableColumns.length);
            var tcs = this.tableColumns;
            for(var i = 0, l = tcs.length; i < l; i++) {
                var tc = tcs[i];
                var tableColumn = doc.createElement('tableColumn');
                tableColumn.setAttribute('id', i + 1);
                tableColumn.setAttribute('name', tc.name);
                tableColumns.appendChild(tableColumn);
                
                if(tc.totalsRowFunction) {
                    tableColumn.setAttribute('totalsRowFunction', tc.totalsRowFunction);
                }
                if(tc.totalsRowLabel) {
                    tableColumn.setAttribute('totalsRowLabel', tc.totalsRowLabel);
                }
            }
            return tableColumns;
        },
		
        exportAutoFilter: function (doc) {
            var autoFilter = doc.createElement('autoFilter');
            if(this.autoFilter != null){
            	var s = this.autoFilter[0];
                var e = this.autoFilter[1];
                autoFilter.setAttribute('ref', util.positionToLetterRef(s[0], s[1]) + ":" + util.positionToLetterRef(e[0], e[1]  - this.totalsRowCount));
            }
            return autoFilter;
        },
		
        exportTableStyleInfo: function (doc) {
            var ts = this.styleInfo;
            var tableStyle = doc.createElement('tableStyleInfo');
            tableStyle.setAttribute('name', ts.themeStyle);
            tableStyle.setAttribute('showFirstColumn', ts.showFirstColumn ? "1" : "0");
            tableStyle.setAttribute('showLastColumn', ts.showLastColumn ? "1" : "0");
            tableStyle.setAttribute('showColumnStripes', ts.showColumnStripes ? "1" : "0");
            tableStyle.setAttribute('showRowStripes', ts.showRowStripes ? "1" : "0");
            return tableStyle;
        },
		
        addAutoFilter: function (startRef, endRef) {
            this.autoFilter = [startRef, endRef];
        }
    });
    
    var Workbook = function (config) {
        this.worksheets = [];
        this.tables = [];
        this.drawings = [];
        this.media = {};
        this.initialize(config);
    };
    _.extend(Workbook.prototype, {

        initialize: function () {
            this.id = _.uniqueId('Workbook');
            this.styleSheet = new StyleSheet();
            this.sharedStrings = new SharedStrings();
            this.relations = new RelationshipManager();
            this.relations.addRelation(this.styleSheet, 'stylesheet');
            this.relations.addRelation(this.sharedStrings, 'sharedStrings');
        },

        createWorksheet: function (config) {
            config = config || {};
            _.defaults(config, {
                name: 'Sheet '.concat(this.worksheets.length + 1)
            });
            return new Worksheet(config);
        },
        
        getStyleSheet: function () {
            return this.styleSheet;
        },

        addTable: function (table) {
            this.tables.push(table);
        },
                
        addDrawings: function (drawings) {
            this.drawings.push(drawings);
        },
        
        addMedia: function (type, fileName, fileData, contentType) {
            var fileNamePieces = fileName.split('.');
            var extension = fileNamePieces[fileNamePieces.length - 1];
            if(!contentType) {
                switch(extension.toLowerCase()) {
                    case 'jpeg':
                    case 'jpg':
                        contentType = "image/jpeg";
                        break;
                    case 'png': 
                        contentType = "image/png";
                        break;
                    case 'gif': 
                        contentType = "image/gif";
                        break;
                    default: 
                        contentType = null;
                        break;
                }
            }
            if(!this.media[fileName]) {
                this.media[fileName] = {
                    id: fileName,
                    data: fileData,
                    fileName: fileName,
                    contentType: contentType,
                    extension: extension
                };
            }
            return this.media[fileName];
        },
        
        addWorksheet: function (worksheet) {
            this.relations.addRelation(worksheet, 'worksheet');
            worksheet.setSharedStringCollection(this.sharedStrings);
            this.worksheets.push(worksheet);
        },

        createContentTypes: function () {
            var doc = util.createXmlDoc(util.schemas.contentTypes, 'Types');
            var types = doc.documentElement;
            var i, l;
            
            types.appendChild(util.createElement(doc, 'Default', [
                ['Extension', "rels"],
                ['ContentType', "application/vnd.openxmlformats-package.relationships+xml"]
            ]));
            types.appendChild(util.createElement(doc, 'Default', [
                ['Extension', "xml"],
                ['ContentType', "application/xml"]
            ]));
            
            var extensions = {};
            for(var filename in this.media) {
                if(this.media.hasOwnProperty(filename)) {
                    extensions[this.media[filename].extension] = this.media[filename].contentType;
                }
            }
            for(var extension in extensions) {
                if(extensions.hasOwnProperty(extension)) {
                    types.appendChild(util.createElement(doc, 'Default', [
                        ['Extension', extension],
                        ['ContentType', extensions[extension]]
                    ]));
                }
            }
            
            types.appendChild(util.createElement(doc, 'Override', [
                ['PartName', "/xl/workbook.xml"],
                ['ContentType', "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"]
            ]));
            types.appendChild(util.createElement(doc, 'Override', [
                ['PartName', "/xl/sharedStrings.xml"],
                ['ContentType', "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"]
            ]));
            types.appendChild(util.createElement(doc, 'Override', [
                ['PartName', "/xl/styles.xml"],
                ['ContentType', "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"]
            ]));

            for(i = 0, l = this.worksheets.length; i < l; i++) {
                types.appendChild(util.createElement(doc, 'Override', [
                    ['PartName', "/xl/worksheets/sheet" + (i + 1) + ".xml"],
                    ['ContentType', "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"]
                ]));
            }
            for(i = 0, l = this.tables.length; i < l; i++) {
                types.appendChild(util.createElement(doc, 'Override', [
                    ['PartName', "/xl/tables/table" + (i + 1) + ".xml"],
                    ['ContentType', "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml"]
                ]));
            }
            
            for(i = 0, l = this.drawings.length; i < l; i++) {
                types.appendChild(util.createElement(doc, 'Override', [
                    ['PartName', '/xl/drawings/drawing' + (i + 1) + '.xml'],
                    ['ContentType', 'application/vnd.openxmlformats-officedocument.drawing+xml']
                ]));
            }
            
            return doc;
        },

        toXML: function () {
            var doc = util.createXmlDoc(util.schemas.spreadsheetml, 'workbook');
            var wb = doc.documentElement;
            wb.setAttribute('xmlns:r', util.schemas.relationships);

            var maxWorksheetNameLength = 31;
            var sheets = util.createElement(doc, 'sheets');
            for(var i = 0, l = this.worksheets.length; i < l; i++) {
                var sheet = doc.createElement('sheet');
                // Microsoft Excel (2007, 2013) do not allow worksheet names longer than 31 characters
                // if the worksheet name is longer, Excel displays an "Excel found unreadable content..." popup when opening the file
                if(console != null && this.worksheets[i].name.length > maxWorksheetNameLength) {
                    console.log('Microsoft Excel requires work sheet names to be less than ' + (maxWorksheetNameLength+1) +
                            ' characters long, work sheet name "' + this.worksheets[i].name +
                            '" is ' + this.worksheets[i].name.length + ' characters long');
                }
                sheet.setAttribute('name', this.worksheets[i].name);
                sheet.setAttribute('sheetId', i + 1);
                sheet.setAttribute('r:id', this.relations.getRelationshipId(this.worksheets[i]));
                sheets.appendChild(sheet);
            }
            wb.appendChild(sheets);
            return doc;
        },

        createWorkbookRelationship: function () {
            var doc = util.createXmlDoc(util.schemas.relationshipPackage, 'Relationships');
            var relationships = doc.documentElement;
            relationships.appendChild(util.createElement(doc, 'Relationship', [
                ['Id', 'rId1'],
                ['Type', util.schemas.officeDocument],
                ['Target', 'xl/workbook.xml']
                ]));
            return doc;
        },
        
        _generateCorePaths: function (files) {
            var i, l;
            Paths[this.styleSheet.id] = 'styles.xml';
            Paths[this.sharedStrings.id] = 'sharedStrings.xml';
            Paths[this.id] = '/xl/workbook.xml';
            
            for(i = 0, l = this.tables.length; i < l; i++) {
                files['/xl/tables/table' + (i + 1) + '.xml'] = this.tables[i].toXML();
                Paths[this.tables[i].id] = '/xl/tables/table' + (i + 1) + '.xml';
            }
            
            for(var fileName in this.media) {
                if(this.media.hasOwnProperty(fileName)) {
                    var media = this.media[fileName];
                    files['/xl/media/' + fileName] = media.data;
                    Paths[fileName] = '/xl/media/' + fileName;
                }
            }
            
            for(i = 0, l = this.drawings.length; i < l; i++) {
                files['/xl/drawings/drawing' + (i + 1) + '.xml'] = this.drawings[i].toXML();
                Paths[this.drawings[i].id] = '/xl/drawings/drawing' + (i + 1) + '.xml';
                files['/xl/drawings/_rels/drawing' + (i + 1) + '.xml.rels'] = this.drawings[i].relations.toXML();
            }
            
            
        },
        
        _prepareFilesForPackaging: function (files) {
            
            _.extend(files, {
                '/[Content_Types].xml': this.createContentTypes(),
                '/_rels/.rels': this.createWorkbookRelationship(),
                '/xl/styles.xml': this.styleSheet.toXML(),
                '/xl/workbook.xml': this.toXML(),
                '/xl/sharedStrings.xml': this.sharedStrings.toXML(),
                '/xl/_rels/workbook.xml.rels': this.relations.toXML()
            });

            _.each(files, function (value, key) {
                if(key.indexOf('.xml') !== -1 || key.indexOf('.rels') !== -1) {
                    if (value instanceof XMLDOM){
                        files[key] = value.toString();
                    } else {
                        files[key] = value.xml || new window.XMLSerializer().serializeToString(value);
                    }
                    var content = files[key].replace(/xmlns=""/g, '');
                    content = content.replace(/NS[\d]+:/g, '');
                    content = content.replace(/xmlns:NS[\d]+=""/g, '');
                    files[key] = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + "\n" + content;
                }
            });
        },
        
        generateFilesAsync: function (options) {
            var requireJsPath = options.requireJsPath;
            var self = this;
            if(!options.requireJsPath) {
                requireJsPath = document.getElementById('requirejs') ? document.getElementById('requirejs').src : '';
            }
            if(!requireJsPath) {
                throw "Please add 'requirejs' to the script that includes requirejs, or specify the path as an argument";
            }
            var files = {},
                doneCount = this.worksheets.length,
                stringsCollectedCount = this.worksheets.length,
                workers = [];
            
            var result = {
                status: "Not Started",
                terminate: function () {
                    for(var i = 0; i < workers.length; i++) {
                        workers[i].terminate();
                    }
                }
            };
            this._generateCorePaths(files);
            
            var done = function () {
                if(--doneCount === 0) {
                    self._prepareFilesForPackaging(files);
                    for(var i = 0; i < workers.length; i++) {
                        workers[i].terminate();
                    }
                    options.success(files);
                }
            };
            var stringsCollected = function () {
                if(--stringsCollectedCount === 0) {
                    for(var i = 0; i < workers.length; i++) {
                        workers[i].postMessage({
                            instruction: 'export',
                            sharedStrings: self.sharedStrings.exportData()
                        });
                    }
                }
            };
            
            
            var worksheetWorker = function (worksheetIndex) {
                return {
                    error: function () {
                        for(var i = 0; i < workers.length; i++) {
                            workers[i].terminate();
                        }
                        //message, filename, lineno
                        options.error.apply(this, arguments);
                    },
                    stringsCollected: function () {
                        stringsCollected();
                    },
                    finished: function (data) {
                        files['/xl/worksheets/sheet' + (worksheetIndex + 1) + '.xml'] = {xml: data};
                        Paths[self.worksheets[worksheetIndex].id] = 'worksheets/sheet' + (worksheetIndex + 1) + '.xml';
                        files['/xl/worksheets/_rels/sheet' + (worksheetIndex + 1) + '.xml.rels'] = self.worksheets[worksheetIndex].relations.toXML();
                        done();
                    }
                };
            };
            
            for(var i = 0, l = this.worksheets.length; i < l; i++) {
                workers.push(
                    this._createWorker(requireJsPath, i, worksheetWorker(i))
                );
            }
            
            return result;
        },
                
        _createWorker: function (requireJsPath, worksheetIndex, callbacks) {
            var worker = new window.Worker(require.toUrl('./WorksheetExportWorker.js'));
            var self = this;
            worker.addEventListener('error', callbacks.error);
            worker.addEventListener('message', function(event) {
//                console.log("Called back by the worker!\n", event.data);
                switch(event.data.status) {
                    case "ready":
                        worker.postMessage({
                            instruction: 'start',
                            data: self.worksheets[worksheetIndex].exportData()
                        });
                        break;
                    case "sharedStrings":
                        for(var i = 0; i < event.data.data.length; i++) {
                            self.sharedStrings.addString(event.data.data[i]);
                        }
                        callbacks.stringsCollected();
                        break;
                    case "finished":
                        callbacks.finished(event.data.data);
                        break;
                }
            }, false);
            worker.postMessage({
                instruction: 'setup',
                config: {
                    paths: {
                        underscore: require.toUrl('underscore').slice(0, -3)
                    },
                    shim: {
                        'underscore': {
                            exports: '_'
                        }
                    }
                },
                requireJsPath: requireJsPath
            });
            return worker;
        },
        
        generateFiles: function () {
            var files = {};
            this._generateCorePaths(files);
            
            
            for(var i = 0, l = this.worksheets.length; i < l; i++) {
                files['/xl/worksheets/sheet' + (i + 1) + '.xml'] = this.worksheets[i].toXML();
                Paths[this.worksheets[i].id] = 'worksheets/sheet' + (i + 1) + '.xml';
                files['/xl/worksheets/_rels/sheet' + (i + 1) + '.xml.rels'] = this.worksheets[i].relations.toXML();
            }
            
            this._prepareFilesForPackaging(files);

            return files;
        }
    });
    
    var Worksheet = function (config) {
        this.relations = null;
        this.columnFormats = [];
        this.data = [];
        this.mergedCells = [];
        this.columns = [];
        this._headers = [];
        this._footers = [];
        this._tables = [];
        this._drawings = [];
        this._rowInstructions = {};
        this._freezePane = {};
        this.initialize(config);
    };
    _.extend(Worksheet.prototype, {
        
        initialize: function (config) {
            config = config || {};
            this.name = config.name;
            this.id = _.uniqueId('Worksheet');
            this._timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
            if(config.columns) {
                this.setColumns(config.columns);
            }
            
            this.relations = new RelationshipManager();
        },
        
        /**
         * Returns an object that can be consumed by a WorksheetExportWorker
         * @returns {Object}
         */
        exportData: function () {
            return {
                relations: this.relations.exportData(),
                columnFormats: this.columnFormats,
                data: this.data,
                columns: this.columns,
                mergedCells: this.mergedCells,
                _headers: this._headers,
                _footers: this._footers,
                _tables: this._tables,
                _rowInstructions: this._rowInstructions,
                _freezePane: this._freezePane,
                name: this.name,
                id: this.id
            };
        },
        
        /**
         * Imports data - to be used while inside of a WorksheetExportWorker.
         * @param {Object} data
         */
        importData: function (data) {
            this.relations.importData(data.relations);
            delete data.relations;
            _.extend(this, data);
        },
        
        setSharedStringCollection: function (stringCollection) {
            this.sharedStrings = stringCollection;
        },
        
        addTable: function (table) {
            this._tables.push(table);
            this.relations.addRelation(table, 'table');
        },
                
        addDrawings: function (table) {
            this._drawings.push(table);
            this.relations.addRelation(table, 'drawingRelationship');
        },

        setRowInstructions: function (rowIndex, instructions) {
            this._rowInstructions[rowIndex] = instructions;
        },
        
        /**
        * Expects an array length of three.
        * 
        * @see Excel/Worksheet compilePageDetailPiece 
        * @see <a href='/cookbook/addingHeadersAndFooters.html'>Adding headers and footers to a worksheet</a>
        * 
        * @param {Array} headers [left, center, right]
        */
        setHeader: function (headers) {
            if(!_.isArray(headers)) {
                throw "Invalid argument type - setHeader expects an array of three instructions";
            }
            this._headers = headers;
        },
        
        /**
        * Expects an array length of three.
        * 
        * @see Excel/Worksheet compilePageDetailPiece 
        * @see <a href='/cookbook/addingHeadersAndFooters.html'>Adding headers and footers to a worksheet</a>
        * 
        * @param {Array} footers [left, center, right]
        */
        setFooter: function (footers) {
            if(!_.isArray(footers)) {
                throw "Invalid argument type - setFooter expects an array of three instructions";
            }
            this._footers = footers;
        },
        
        /**
         * Turns page header/footer details into the proper format for Excel.
         * @param {type} data
         * @returns {String}
         */
        compilePageDetailPackage: function (data) {
            data = data || "";
            return [
            "&L", this.compilePageDetailPiece(data[0] || ""),
            "&C", this.compilePageDetailPiece(data[1] || ""),
            "&R", this.compilePageDetailPiece(data[2] || "")
            ].join('');
        },
    
        /**
         * Turns instructions on page header/footer details into something
         * usable by Excel.
         * 
         * @param {type} data
         * @returns {String|@exp;_@call;reduce}
         */
        compilePageDetailPiece: function (data) {
            if(_.isString(data)) {
                return '&"-,Regular"'.concat(data);
            }
            if(_.isObject(data) && !_.isArray(data)) { 
                var string = "";
                if(data.font || data.bold) {
                    var weighting = data.bold ? "Bold" : "Regular";
                    string += '&"' + (data.font || '-');
                    string += ',' + weighting + '"';
                } else {
                    string += '&"-,Regular"';
                }
                if(data.underline) {
                    string += "&U";
                }
                if(data.fontSize) {
                    string += "&"+data.fontSize;
                }
                string += data.text;
                
                return string;
            }
            
            if(_.isArray(data)) {
                var self = this;
                return _.reduce(data, function (m, v) {
                    return m.concat(self.compilePageDetailPiece(v));
                }, "");
            }
        },
        
        /**
         * Creates the header node. 
         * 
         * @todo implement the ability to do even/odd headers
         * @param {XML Doc} doc
         * @returns {XML Node}
         */
        exportHeader: function (doc) {
            var oddHeader = doc.createElement('oddHeader');
            oddHeader.appendChild(doc.createTextNode(this.compilePageDetailPackage(this._headers)));
            return oddHeader;
        },
    
        /**
         * Creates the footer node.
         * 
         * @todo implement the ability to do even/odd footers
         * @param {XML Doc} doc
         * @returns {XML Node}
         */    
        exportFooter: function (doc) {
            var oddFooter = doc.createElement('oddFooter');
            oddFooter.appendChild(doc.createTextNode(this.compilePageDetailPackage(this._footers)));
            return oddFooter;
        },
        
        /**
         * This creates some nodes ahead of time, which cuts down on generation time due to 
         * most cell definitions being essentially the same, but having multiple nodes that need
         * to be created. Cloning takes less time than creation.
         * 
         * @private
         * @param {XML Doc} doc
         * @returns {_L8.Anonym$0._buildCache.Anonym$2}
         */
        _buildCache: function (doc) {
            var numberNode = doc.createElement('c');
            var value = doc.createElement('v');
            value.appendChild(doc.createTextNode("--temp--"));
            numberNode.appendChild(value);
            
            var formulaNode = doc.createElement('c');
            var formulaValue = doc.createElement('f');
            formulaValue.appendChild(doc.createTextNode("--temp--"));
            formulaNode.appendChild(formulaValue);
            
            var stringNode = doc.createElement('c');
            stringNode.setAttribute('t', 's');
            var stringValue = doc.createElement('v');
            stringValue.appendChild(doc.createTextNode("--temp--"));
            stringNode.appendChild(stringValue);
            
            
            return {
                number: numberNode,
                date: numberNode,
                string: stringNode,
                formula: formulaNode
            };
        },
        
        /**
         * Runs through the XML document and grabs all of the strings that will
         * be sent to the 'shared strings' document. 
         * 
         * @returns {Array}
         */
        collectSharedStrings: function () {
            var data = this.data;
            var maxX = 0;
            var strings = {};
            for(var row = 0, l = data.length; row < l; row++) {
                var dataRow = data[row];
                var cellCount = dataRow.length;
                maxX = cellCount > maxX ? cellCount : maxX;
                for(var c = 0; c < cellCount; c++) {
                    var cellValue = dataRow[c];
                    var metadata = cellValue && cellValue.metadata || {};
                    if (cellValue && typeof cellValue === 'object') {
                        cellValue = cellValue.value;
                    }
                    
                    if(!metadata.type) {
                        if(typeof cellValue === 'number') {
                            metadata.type = 'number';
                        }
                    }
                    if(metadata.type === "text" || !metadata.type) {
                        if(typeof strings[cellValue] === 'undefined') {
                            strings[cellValue] = true;
                        }
                    }
                }
            }
            return _.keys(strings);
        },
        
        toXML: function () {
            var data = this.data;
            var columns = this.columns || [];
            var doc = util.createXmlDoc(util.schemas.spreadsheetml, 'worksheet');
            var worksheet = doc.documentElement;
            var i, l, row;
            worksheet.setAttribute('xmlns:r', util.schemas.relationships);
            worksheet.setAttribute('xmlns:mc', util.schemas.markupCompat);
            
            var maxX = 0;
            var sheetData = util.createElement(doc, 'sheetData');
            
            var cellCache = this._buildCache(doc);
            
            for(row = 0, l = data.length; row < l; row++) {
                var dataRow = data[row];
                var cellCount = dataRow.length;
                maxX = cellCount > maxX ? cellCount : maxX;
                var rowNode = doc.createElement('row');
                
                for(var c = 0; c < cellCount; c++) {
                    columns[c] = columns[c] || {};
                    var cellValue = dataRow[c];
                    var cell, metadata = cellValue && cellValue.metadata || {};

                    if (cellValue && typeof cellValue === 'object') {
                        cellValue = cellValue.value;
                    }
            
                    if(!metadata.type) {
                        if(typeof cellValue === 'number') {
                            metadata.type = 'number';
                        }
                    }

                    switch(metadata.type) {
                        case "number":
                            cell = cellCache.number.cloneNode(true);
                            cell.firstChild.firstChild.nodeValue = cellValue;
                            break;
                        case "date":
                            cell = cellCache.date.cloneNode(true);
                            cell.firstChild.firstChild.nodeValue = 25569.0 + ((cellValue - this._timezoneOffset)  / (60 * 60 * 24 * 1000));
                            break;
                        case "formula":
                            cell = cellCache.formula.cloneNode(true);
                            cell.firstChild.firstChild.nodeValue = cellValue;
                            break;
                        case "text":
                            /*falls through*/
                        default:
                            var id;
                            if(typeof this.sharedStrings.strings[cellValue] !== 'undefined') {
                                id = this.sharedStrings.strings[cellValue];
                            } else {
                                id = this.sharedStrings.addString(cellValue);
                            }
                            cell = cellCache.string.cloneNode(true);
                            cell.firstChild.firstChild.nodeValue = id;
                            break;
                    }
                    if(metadata.style) {
                        cell.setAttribute('s', metadata.style);
                    } else if (this._rowInstructions[row] && this._rowInstructions[row].style !== undefined) {
                        cell.setAttribute('s', this._rowInstructions[row].style);
                    }
                    cell.setAttribute('r', util.positionToLetterRef(c + 1, row + 1));
                    rowNode.appendChild(cell);
                }
                rowNode.setAttribute('r', row + 1);

                if (this._rowInstructions[row]) {
                    var rowInst = this._rowInstructions[row];

                    if (rowInst.height !== undefined) {
                        rowNode.setAttribute('customHeight', '1');
                        rowNode.setAttribute('ht', rowInst.height);
                    }

                    if (rowInst.style !== undefined) {
                      rowNode.setAttribute('customFormat', '1');
                      rowNode.setAttribute('s', rowInst.style);
                    }
                }

                sheetData.appendChild(rowNode);
            } 
            
            if(maxX !== 0) {
                worksheet.appendChild(util.createElement(doc, 'dimension', [
                    ['ref',  util.positionToLetterRef(1, 1) + ':' + util.positionToLetterRef(maxX, data.length)]
                ]));
            } else {
                worksheet.appendChild(util.createElement(doc, 'dimension', [
                    ['ref',  util.positionToLetterRef(1, 1)]
                ]));
            }

            //added freeze pane
            if (this._freezePane.cell) {
                worksheet.appendChild(this.exportPane(doc));
            }

            if(this.columns.length) {
                worksheet.appendChild(this.exportColumns(doc));
            }
            worksheet.appendChild(sheetData);

            // 'mergeCells' should be written before 'headerFoot' and 'drawing' due to issue
            // with Microsoft Excel (2007, 2013)
            if (this.mergedCells.length > 0) {
                var mergeCells = doc.createElement('mergeCells');
                for (i = 0, l = this.mergedCells.length; i < l; i++) {
                    var mergeCell = doc.createElement('mergeCell');
                    mergeCell.setAttribute('ref', this.mergedCells[i][0] + ':' + this.mergedCells[i][1]);
                    mergeCells.appendChild(mergeCell);
                }
                worksheet.appendChild(mergeCells);
            }
            
            this.exportPageSettings(doc, worksheet);
            
            if(this._headers.length > 0 || this._footers.length > 0) {
                var headerFooter = doc.createElement('headerFooter');
                if(this._headers.length > 0) {
                    headerFooter.appendChild(this.exportHeader(doc));
                }
                if(this._footers.length > 0) {
                    headerFooter.appendChild(this.exportFooter(doc));
                }
                worksheet.appendChild(headerFooter);
            }
            
            if(this._tables.length > 0) {
                var tables = doc.createElement('tableParts');
                tables.setAttribute('count', this._tables.length);
                for(i = 0, l = this._tables.length; i < l; i++) {
                    var table = doc.createElement('tablePart');
                    table.setAttribute('r:id', this.relations.getRelationshipId(this._tables[i]));
                    tables.appendChild(table);
                }
                worksheet.appendChild(tables);
            }

            // the 'drawing' element should be written last, after 'headerFooter', 'mergeCells', etc. due
            // to issue with Microsoft Excel (2007, 2013)
            for(i = 0, l = this._drawings.length; i < l; i++) {
                var drawing = doc.createElement('drawing');
                drawing.setAttribute('r:id', this.relations.getRelationshipId(this._drawings[i]));
                worksheet.appendChild(drawing);
            }
            return doc;
        },
        
        /**
         * 
         * @param {XML Doc} doc
         * @returns {XML Node}
         */
        exportColumns: function (doc) {
            var cols = util.createElement(doc, 'cols');
            for(var i = 0, l = this.columns.length; i < l; i++) {
                var cd = this.columns[i];
                var col = util.createElement(doc, 'col', [
                    ['min', cd.min || i + 1],
                    ['max', cd.max || i + 1]
                ]);
                if (cd.hidden) {
                    col.setAttribute('hidden', 1);
                }
                if(cd.bestFit) {
                    col.setAttribute('bestFit', 1);
                }
                if(cd.customWidth || cd.width) {
                    col.setAttribute('customWidth', 1);
                }
                if(cd.width) {
                    col.setAttribute('width', cd.width);
                } else {
                    col.setAttribute('width', 9.140625);
                }
                
                cols.appendChild(col);
            }
            return cols;
        },
        
        /**
         * Added frozen pane
         * @param {XML Node} doc
         * @returns {XML Node}
         */
        exportPane: function (doc) {
            var sheetViews = doc.createElement('sheetViews'),
                sheetView = doc.createElement('sheetView'),
                pane = doc.createElement('pane');

            sheetView.setAttribute('workbookViewId', 0);
            pane.setAttribute('xSplit', this._freezePane.xSplit);
            pane.setAttribute('ySplit', this._freezePane.ySplit);
            pane.setAttribute('topLeftCell', this._freezePane.cell);
            pane.setAttribute('activePane', 'bottomRight');
            pane.setAttribute('state', 'frozen');

            sheetView.appendChild(pane);
            sheetViews.appendChild(sheetView);
            return sheetViews;
        },

        /**
         * Sets the page settings on a worksheet node.
         * 
         * @param {XML Doc} doc
         * @param {XML Node} worksheet
         * @returns {undefined}
         */
        exportPageSettings: function (doc, worksheet) {
            
            if(this._orientation) {
                worksheet.appendChild(util.createElement(doc, 'pageSetup', [
                    ['orientation', this._orientation]
                ]));
            }
        },
    
        /**
         * http://www.schemacentral.com/sc/ooxml/t-ssml_ST_Orientation.html
         * 
         * Can be one of 'portrait' or 'landscape'.
         * 
         * @param {String} orientation
         * @returns {undefined}
         */
        setPageOrientation: function (orientation) {
            this._orientation = orientation;
        },
        
        /**
         * Expects an array of column definitions. Each column definition needs to have a width assigned to it. 
         * 
         * @param {Array} columns
         */
        setColumns: function (columns) {
            this.columns = columns;
        },
        
        /**
         * Expects an array of data to be translated into cells. 
         * 
         * @param {Array} data Two dimensional array - [ [A1, A2], [B1, B2] ]
         * @see <a href='/cookbook/addingDataToAWorksheet.html'>Adding data to a worksheet</a>
         */
        setData: function (data) {
            this.data = data;
        },

        /**
         * Merge cells in given range
         *
         * @param cell1 - A1, A2...
         * @param cell2 - A2, A3...
         */
        mergeCells: function(cell1, cell2) {
            this.mergedCells.push([cell1, cell2]);
        },
        
        /**
         * Added froze pane
         * @param column - column number: 0, 1, 2 ...
         * @param row - row number: 0, 1, 2 ...
         * @param cell - 'A1'
         */
        freezePane: function(column, row, cell) {
            this._freezePane = {xSplit: column, ySplit: row, cell: cell};
        },

        /**
         * Expects an array containing an object full of column format definitions.
         * http://msdn.microsoft.com/en-us/library/documentformat.openxml.spreadsheet.column.aspx
         * bestFit
         * collapsed
         * customWidth
         * hidden
         * max
         * min
         * outlineLevel 
         * phonetic
         * style
         * width
         * @param {Array} columnFormats
         */
        setColumnFormats: function (columnFormats) {
            this.columnFormats = columnFormats;
        }
    });
    
    var Template = function (worksheetConstructorSettings) {
		this.workbook = new Workbook();
		this.stylesheet = this.workbook.getStyleSheet();
		
		this.columns = {};
		
		this.predefinedStyles = {
			
		};
		
		this.predefinedFormatters = {
			date: this.stylesheet.createSimpleFormatter('date'),
			currency: this.stylesheet.createFormat({format: "$ #,##0.00;$ #,##0.00;-", font: {color: "FFE9F50A"}}),
			header: this.stylesheet.createFormat({
				font: { bold: true, underline: true, color: {theme: 3}},
				alignment: {horizontal: 'center'}
			})
		};

		if(worksheetConstructorSettings != null) {
			this.worksheet = this.workbook.createWorksheet(worksheetConstructorSettings);
		}
		else {
			this.worksheet = this.workbook.createWorksheet();
		}
		this.workbook.addWorksheet(this.worksheet);
		this.worksheet.setPageOrientation('landscape');
		this.table = new Table();
		this.table.styleInfo.themeStyle = "TableStyleLight1";
		this.worksheet.addTable(this.table);
		this.workbook.addTable(this.table);
	}
	$.extend(true, Template.prototype, {
		setHeader: function () {
			this.worksheet.setHeader.apply(this.worksheet, arguments);
		},
		setFooter: function () {
			this.worksheet.setFooter.apply(this.worksheet, arguments);
		},
		prepare: function () {
			return this.workbook;
		},
		
		setData: function (worksheetData) {
			this.worksheet.setData(worksheetData);
			this.data = worksheetData;
			this.table.setReferenceRange([1, 1], [this.columns.length, worksheetData.length]);
		},
		
		setColumns: function (columns) {
			this.columns = columns;
			this.worksheet.setColumns(columns);
			this.table.setTableColumns(columns);
			this.table.setReferenceRange([1, 1], [this.columns.length, this.data.length]);
		},

		getWorksheet: function () {
			return this.worksheet;
		}
	});
    
	
	gonrin.spreadsheet = function (options) {
		options = $.extend(true, {}, gonrin.spreadsheet.defaults, options);
		options.excel.file_name = options.excel.file_name || null;
		var fields = options.fields || [];
		var datasource = options.dataSource || [];
		var columns = [];
		var worksheetData = [];
		
		_.each(fields, function (field, key) {
			var col = {};
			col.id = field.field;
			col.name = field.label;
			col.type = field.type || 'string';
			col.width = field.width;
			columns.push(col);
		});
		
		/*var columns = [
            {id: 'id', name: "ID", type: 'number', width: 20},
            {id: 'name', name:"Name", type: 'string', width: 50},
            {id: 'price', name: "Price", type: 'number'},
            {id: 'location', name: "Location", type: 'string'},
            {id: 'startDate', name: "Start Date", type: 'date', width: 15},
            {id: 'endDate', name: "End Date", type: 'date', width: 15}
        ];*/
		var dhrow = [];
		for(var i in fields) {
			var obj;
        	if(fields[i].label){
        		obj = {value: fields[i].label };
        	}else{
        		obj = {value: fields[i].field || ""};
        	}
        	dhrow.push(obj);
        }
		worksheetData.push(dhrow);
		
		for(var row in datasource) {
        	var dtrow = [];
        	
        	for(var i in fields) {
        		var obj = {value: (datasource[row][fields[i].field] || "")};
            	dtrow.push(obj);
        	}
        	worksheetData.push(dtrow);
        	
        	
			
			
			
			
			/*var tr_tbl_html = "<tr>";

            for(i in sheet.fields) {
            	
                tr_tbl_html += '<td>' + (datasource[row][sheet.fields[i].field] || "") + '</td>';  
            }
        	tr_tbl_html += "</tr>";
        	table.push(tr_tbl_html);*/
        }
		
		
		/*var worksheetData = [
             [
                 {value: "ID"}, 
                 {value: "Name", metadata: {type: 'string'}}, 
                 {value: "Price", metadata: {type: 'string'}}, 
                 {value: "Location", metadata: {type: 'string'}}, 
                 {value: "Start Date", metadata: {type: 'string'}},
                 {value: "End Date", metadata: {type: 'string'}}
             ],
             [
              {value: "1"}, 
              {value: "2", metadata: {type: 'string'}}, 
              {value: "3", metadata: {type: 'string'}}, 
              {value: "4", metadata: {type: 'string'}}, 
              {value: "5 Date", metadata: {type: 'string'}},
              {value: "End 6", metadata: {type: 'string'}}
          ],
        ];*/
	
		var basic_template = new Template();
		
		basic_template.setHeader([
           {bold: false, text: "Generic Report"}, "", ""
        ]);
		basic_template.setData(worksheetData);
		basic_template.setColumns(columns);
		basic_template.setFooter([
           '', '', 'Page &P of &N'
        ]);
		
		
		var createFile = function (workbook, options) {
            var zip = new JSZip();
            var files = workbook.generateFiles();
            $.each(files, function (path,content) {
                path = path.substr(1);
                if(path.indexOf('.xml') !== -1 || path.indexOf('.rel') !== -1) {
                    zip.file(path, content, {base64: false});
                } else {
                    zip.file(path, content, {base64: true, binary: true});
                }
            })
            options = options || {};
            if(!options.type){
            	options.type = "base64";
            }
            return zip.generate(options);
        };
        basic_template.save_excel = function(){
        	var rhref = createFile(basic_template.prepare());
        	var link = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,"+rhref;
            var a = document.createElement("a");
            a.download = options.excel.file_name;
            a.href = link;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            return true;
        };
        
		return basic_template;
    };
    
    

    gonrin.spreadsheet.defaults = {
    	defaults: {
    		fontsize : 12,
    	},
    	sheets: [],
    	excel:{},
    };
}));