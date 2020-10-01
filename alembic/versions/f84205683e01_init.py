"""init

Revision ID: f84205683e01
Revises: 09e0ed865939
Create Date: 2020-09-30 14:15:05.734897

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f84205683e01'
down_revision = '09e0ed865939'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('qrworker', sa.Column('namefile', sa.String(length=255), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('qrworker', 'namefile')
    # ### end Alembic commands ###
