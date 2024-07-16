"""empty message

Revision ID: afd5ca5250f2
Revises: 2543002fded5
Create Date: 2024-07-16 16:43:46.175709

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'afd5ca5250f2'
down_revision = '2543002fded5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('members', schema=None) as batch_op:
        batch_op.alter_column('last_charged',
               existing_type=sa.DATETIME(),
               nullable=True)

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_member', sa.Boolean(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('is_member')

    with op.batch_alter_table('members', schema=None) as batch_op:
        batch_op.alter_column('last_charged',
               existing_type=sa.DATETIME(),
               nullable=False)

    # ### end Alembic commands ###
