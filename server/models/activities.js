const ActivitiesModel = (sequelize, DataTypes) => {
    const Activities = sequelize.define(
        "Activities", {
        Activity_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        GoalID: { type: DataTypes.INTEGER, allowNull: false },
        Title: { type: DataTypes.STRING, allowNull: false },
        start: { type: DataTypes.DATE, allowNull: false },
        end: { type: DataTypes.DATE, allowNull: false },
    },
        { tableName: "Activities", timestamps: true },
    )
    return Activities;
}

export default ActivitiesModel;