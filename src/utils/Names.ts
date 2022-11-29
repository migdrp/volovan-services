///<reference path="../types/types.d.ts" />
import { compareTwoStrings } from 'string-similarity';

const IsValidName: Utils.IsValidName = (name: string) => /^(?:((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-.\s])){1,}(['’,\-\.]){0,1}){2,}(([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-. ]))*(([ ]+){0,1}(((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){1,})(['’\-,\.]){0,1}){2,}((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){2,})?)*)$/.test(name) ? true : false;

const compareSimilarity = (strA: string, strB: string): number => {
  return compareTwoStrings(strA, strB);
}


export const Names = {
  IsValidName,
  compareSimilarity
}

