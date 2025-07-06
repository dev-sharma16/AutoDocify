// TODO 1.write fetch function to feth the file data and test it, 2.Add auth function and prtect the '/generate' from non logined user

import axios from "axios";

async function fetchContent(repoDetail,path=""){
  const url = `https://api.github.com/repos/${repoDetail.userName}/${repoDetail.repoName}/contents/${path}`
  console.log(url);
  const files = (await axios.get(url)).data
  // console.log(files);
  let fileContent_Name = []
  for(const item of files){
    if (item.type == "file" && item.download_url) {
      const contentResponse = await axios.get(item.download_url);
      fileContent_Name.push({
        name: item.path,
        content: contentResponse.data
      });
    } else if (item.type == "dir") {
      const nested = await fetchContent(repoDetail, item.path)
      fileContent_Name = fileContent_Name.concat(nested)
    }
  }

  return fileContent_Name
}

export default fetchContent
