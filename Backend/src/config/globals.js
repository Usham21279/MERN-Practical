import { connect, mongoose } from "./database";

export const global = async () => {
  global.mongoose = mongoose;

  await connect();
}