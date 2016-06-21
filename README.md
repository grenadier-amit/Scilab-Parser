## SCILAB PARSER ##
A simple python script to convert scilab data -structures into equivalent javascipt.

###How it works?

 - It searches for all the .sci files in scilab which are the block files in xcos's palette. 
 - Then it removes all the comments and append all single scilab statement into one file.
 - Then it extracts the code of "case "define"" and parse it line by line using regex.
 - It split the content of line from "=" symbol and analyze both parts for ScilabInteger ,ScilabDouble ,ScilabString ,list and mlist ,etc.
 - We have also defined one epsilon case which will handle scicos_link ,list and standard_define functions.

###Contributors :

 - [AMIT KUMAR YADAV](https://github.com/grenadier-amit)
 - [NIMISH SINGHAL](https://github.com/ASP1234)

