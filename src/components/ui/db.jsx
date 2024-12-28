// export const tasks = mysqlTable("tasks", {
//     id: serial("id").primaryKey(),
//     code: varchar("code", { length: 255 }).unique(),
//     title: varchar("title", { length: 255 }),
//     status: mysqlEnum("status", ["todo", "in-progress", "done", "canceled"])
//       .notNull()
//       .default("todo"),
//     label: mysqlEnum("label", ["bug", "feature", "enhancement", "documentation"])
//       .notNull()
//       .default("bug"),
//     priority: mysqlEnum("priority", ["low", "medium", "high"])
//       .notNull()
//       .default("low"),
//   });

export const tasks = mysqlTable("tasks", {
    id: serial("id").primaryKey(),
    code: varchar("code", 255).unique(),
    title: varchar("title", 255),
    status: mysqlEnum("status", {
      values: ["todo", "in-progress", "done", "canceled"],
      notNull: true,
      default: "todo",
    }),
    label: mysqlEnum("label", {
      values: ["bug", "feature", "enhancement", "documentation"],
      notNull: true,
      default: "bug",
    }),
    priority: mysqlEnum("priority", {
      values: ["low", "medium", "high"],
      notNull: true,
      default: "low",
    }),
  });