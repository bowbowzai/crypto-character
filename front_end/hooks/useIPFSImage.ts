const getIPFSImage = async (ipfsURL: string) => {
  try {
    const arr = ipfsURL.split("//");
    const ipfsHash = arr[1];

    const response = await fetch(`https://ipfs.io/ipfs/${ipfsHash}`);
    const blob = await response.blob();
    const imgUrl = URL.createObjectURL(blob);
    return imgUrl;
  } catch (error) {
    throw error;
  }
};

export default getIPFSImage;
