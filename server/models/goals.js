const goalModel = (sequelize, DataTypes) => {
    const GOAL_TYPES = ["LOSE_WEIGHT", "GAIN_MUSCLE", "GET_STRONGER", "IMPROVE_FITNESS"]
    const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

    const Goal = sequelize.define(
        "Goal", {
        GoalID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        UID: { type: DataTypes.INTEGER, allowNull: false },
        Goal: { type: DataTypes.ENUM(...GOAL_TYPES), allowNull: false },
        AvailableDays: { type: DataTypes.ARRAY(DataTypes.ENUM(...DAYS)), allowNull: false, defaultValue: [] },
        time_slots: { type: DataTypes.JSONB, allowNull: false, defaultValue: [] }
    },
        { tableName: "Goals", timestamps: true }
    )
    return Goal;
}


export default goalModel;