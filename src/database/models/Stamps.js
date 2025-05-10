import BaseModel from '../BaseModel'


export default class Stamps extends BaseModel {

    static init(sequelize, DataTypes) {
        return super.init(
            {
                userId: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false,
                    primaryKey: true
                },
                stampId: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false,
                    primaryKey: true
                }
            },
            { sequelize, timestamps: false, tableName: 'stamps' }
        )
    }

    static associate({ users }) {
        this.belongsTo(users, {
            foreignKey: 'userId'
        })
    }

}
