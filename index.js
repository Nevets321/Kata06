#!/usr/bin/env node
'use strict';
const program = require('commander');

const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      var n = m.join("");
      result.push(n)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
      }
    }
  }
  permute(inputArr);
  return result;
}

let listFunction = (word) => {
  if(word){
    const wordArray = word.split("");
    const permutations = permutator(wordArray);
    const fs = require('fs');
    fs.readFile('wordlist.txt', 'utf-8', function(err,data){
      if(err){
        return console.log(err);
      }
      let wordlist = data.split("\r\n");
      var checkedList = [];
      permutations.map(function(a){
        if(wordlist.includes(a) && a !== word){
          return checkedList.push(a);
        }else{
          return;
        }
      });
      if(checkedList.length > 0){
        console.log(checkedList);
      }
    });
  }else{
    return console.log('Missing word for anagram');
  }
}

program
  .version('0.0.1')
  .command('find [word]')
  .description('Find anagrams!')
  .action(listFunction);
program.parse(process.argv);
