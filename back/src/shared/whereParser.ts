import { Query } from 'firebase-admin/firestore';

export function whereParser(
  where: any,
  store: FirebaseFirestore.CollectionReference,
) {
  const whereKeys = Object.keys(where);
  let query: Query = store;
  if (whereKeys.length > 0) {
    whereKeys.forEach((value) => {
      query = query.where(value, '==', where[value]);
    });
  }
  return query;
}
