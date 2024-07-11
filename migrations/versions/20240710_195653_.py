"""empty message

Revision ID: 6aa5ffbf964f
Revises: 9492b89e5f50
Create Date: 2024-07-10 19:56:53.382441

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6aa5ffbf964f'
down_revision = '9492b89e5f50'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('admissionTicketTypes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('type', sa.String(length=40), nullable=False))

    with op.batch_alter_table('eventTicketTypes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('type', sa.String(length=40), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('eventTicketTypes', schema=None) as batch_op:
        batch_op.drop_column('type')

    with op.batch_alter_table('admissionTicketTypes', schema=None) as batch_op:
        batch_op.drop_column('type')

    # ### end Alembic commands ###
