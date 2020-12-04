"""working on models

Revision ID: 24fef7076bd6
Revises: ffdc0a98111c
Create Date: 2020-12-03 19:21:53.035681

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '24fef7076bd6'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('types',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=40), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('title')
    )
    op.create_table('businesses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('lat', sa.String(length=20), nullable=False),
    sa.Column('lng', sa.String(length=20), nullable=False),
    sa.Column('address', sa.String(length=100), nullable=True),
    sa.Column('state', sa.String(length=15), nullable=False),
    sa.Column('zipcode', sa.String(length=10), nullable=False),
    sa.Column('imgURL', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('body', sa.Text(), nullable=False),
    sa.Column('rating', sa.SmallInteger(), nullable=False),
    sa.Column('imgURL', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('businessTypes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type_id', sa.Integer(), nullable=False),
    sa.Column('business_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['business_id'], ['businesses.id'], ),
    sa.ForeignKeyConstraint(['type_id'], ['types.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('judgements',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('review_id', sa.Integer(), nullable=False),
    sa.Column('business_id', sa.Integer(), nullable=False),
    sa.Column('recommend', sa.Boolean(), nullable=True),
    sa.Column('avoid', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['business_id'], ['businesses.id'], ),
    sa.ForeignKeyConstraint(['review_id'], ['reviews.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('judgements')
    op.drop_table('businessTypes')
    op.drop_table('reviews')
    op.drop_table('businesses')
    op.drop_table('types')
    # ### end Alembic commands ###
