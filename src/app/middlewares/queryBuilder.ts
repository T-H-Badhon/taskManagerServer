export const queryFilter = (query: Record<string, unknown>) => {
  const filter = { ...query }
  const nonFilterFields = ['searchTerm']

  if (query?.searchTerm) {
    filter.title = { $regex: query.searchTerm, $options: 'i' }
  }

  nonFilterFields.forEach((field) => delete filter[field])

  for (const key in filter) {
    if (filter[key] == '') {
      delete filter[key]
    }
  }

  if (filter?.dueDate) {
    filter.dueDate = { $lte: filter.dueDate }
  }

  return filter
}
