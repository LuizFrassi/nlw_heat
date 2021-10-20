import { serverHttp } from "./app";

serverHttp.listen(process.env.port, () =>
    console.log(`Server is running os port ${process.env.port}`)
);