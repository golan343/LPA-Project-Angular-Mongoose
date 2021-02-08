const Page = require('./../models/page');

class pagesUtil{
    pages;
    getAllPages(callback){
       return  Page.find({}).exec(callback); 
       
    }
     getPage(pageName, callback){
        return Page.find({urlName:pageName}).exec(callback);
    }
    async setPageContentObject(pageContent){
       
        const pageInstance = new Page(pageContent);
        const error = await page.validate();
        if(error){
            return error;
        }
        return await pageInstance.save();
    }
    async setPageContent(urlName, title, content, subTitle, metaTypes){
        let pageContent = {
            urlName,
            title,
            subTitle,
            content,
            metaTypes
        };
        const pageInstance = new Page(pageContent);
        return await pageInstance.save();
    }

     updatePageContent(urlName, title, content, subTitle, metaTypes){
      return Page.findOneAndUpdate({urlName: new RegExp("^" + urlName + "$", "i")},{title,content,subTitle,metaTypes});
    }
}

module.exports = pagesUtil;