import BaseModel from '../BaseModel'


export default class CoverStamps extends BaseModel {

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
                },
                type: {
                    type: DataTypes.STRING(12),
                    allowNull: false,
                    defaultValue: "stamp"
                },
                x: {
                    type: DataTypes.INTEGER(6),
                    allowNull: false,
                    defaultValue: 0
                },
                y: {
                    type: DataTypes.INTEGER(6),
                    allowNull: false,
                    defaultValue: 0
                }
            },
            { sequelize, timestamps: false, tableName: 'cover_stamps' }
        )
    }

    static associate({ users }) {
        this.belongsTo(users, {
            foreignKey: 'userId'
        })
    }

}
