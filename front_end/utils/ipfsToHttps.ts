const ipfsToHttps = (ipfsURL: string) => {
  try {
    const arr = ipfsURL.split("//");
    const ipfsHash = arr[1];

    return `https://ipfs.io/ipfs/${ipfsHash}`;
  } catch (error) {
    throw error;
  }
};

export default ipfsToHttps;
