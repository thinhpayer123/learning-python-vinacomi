"""init

Revision ID: 09e0ed865939
Revises: 47099562f319
Create Date: 2020-09-29 16:18:37.551280

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '09e0ed865939'
down_revision = '47099562f319'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('qrworker', sa.Column('status', sa.String(length=10), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('qrworker', 'status')
    # ### end Alembic commands ###
