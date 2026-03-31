import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Minimal schema - this is a data-driven dashboard with no user-generated content
export const dashboardViews = sqliteTable("dashboard_views", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  page: text("page").notNull(),
  viewedAt: text("viewed_at").notNull(),
});

export const insertDashboardViewSchema = createInsertSchema(dashboardViews).omit({ id: true });
export type InsertDashboardView = z.infer<typeof insertDashboardViewSchema>;
export type DashboardView = typeof dashboardViews.$inferSelect;
