export const extractConstants = (link)=>{
    try {
        const url = new URL(link);
        const parts = url.pathname.split("/").filter(Boolean);
        
        if(parts.length >= 2){
            const username = parts[0];
            const repo = parts[1].replace(/\.git$/, "");
            return { 
                userName: username, 
                repoName: repo,
                link: link
            };
        } else {
            console.log("Invalid URL");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}
