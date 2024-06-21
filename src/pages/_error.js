export default function Error() {
  return null;
}

export async function getServerSideProps({ res }) {
  res.writeHead(302, {
    Location: '/404'
  });
  res.end();

  return {
    props: {}
  };
}
