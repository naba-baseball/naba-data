import { findAll } from "../services/teams.service.js";

export default defineEventHandler(async () => {
  console.log('GETTING TEAMAS')
  return await findAll();
});
