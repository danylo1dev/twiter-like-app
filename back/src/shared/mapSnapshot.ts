export const mapArrayFromSnaphot = (snapshot) => {
  console.log(snapshot.docs);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    console.log(data);
    return { id: doc.id, ...data };
  });
};
