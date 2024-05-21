export const mapArrayFromSnaphot = (snapshot) => {
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return { id: doc.id, ...data };
  });
};
