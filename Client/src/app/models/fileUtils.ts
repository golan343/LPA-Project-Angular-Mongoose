export class fileUtils{
    getFileType(type:string):string{
        switch (type) {
            case "image/png":
              return "png";
            case "image/jpg":
              return "jpg";
            case "image/jpeg":
              return "jpeg";
            case "image/gif":
              return "gif";
            case "application/pdf":
              return "pdf";
            case "application/msword":
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.template":
              return "doc";
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            case "application/vnd.ms-excel":
              return "xlsx";
            case "image/tiff":
              return "tiff";
            default:
              return "txt";
          }
    }
}