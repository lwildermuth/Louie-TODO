import { eq, and } from 'drizzle-orm'
import { useValidatedParams, useValidatedBody, z, zh } from 'h3-zod'

/* -- Old Code
export default eventHandler(async (event) => {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString
  })
  const { completed } = await useValidatedBody(event, {
    completed: z.number().int().min(0).max(1)
  })
  const { user } = await requireUserSession(event)
  // List todos for the current user
  const todo = await useDB().update(tables.todos).set({
    completed
  }).where(and(
    eq(tables.todos.id, id),
    eq(tables.todos.userId, user.id)
  )).returning().get()
  return todo
})
*/

export default eventHandler(async (event) => {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString
  })
  const { completed } = await useValidatedBody(event, {
    completed: z.number().int().min(0).max(1)
  })

  // Update any todo regardless of user
  const todo = await useDB().update(tables.todos)
    .set({
      completed
    })
    .where(eq(tables.todos.id, id))
    .returning()
    .get()

  return todo
})
