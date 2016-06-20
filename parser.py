import re
import sys
import os
import collections


orig_stdout = sys.stdout


# TO HANDLE ALL DISTINCT VARIBLES ENCOUNTERED
varList={}
mapping={}
# PATH FOR ALL .SCI FILES
rootdir = '/usr/share/scilab'


#-------------- FUNCTION FOR ANALYSING RHS AFTER "=" SIGN IN A STATEMENT--------------#
def Analyser(token):
    if token[1].endswith(',') or token[1].endswith(';'):
        token[1] = token[1][:-1]
    if token[1][0] == '\"':
        token[1] = '[' + token[1] + ']'
        print "\t%s = %s;" % (token[0], scilabString(token[1]))
    elif token[1][0] == "%":
        token[1] = '[' + token[1] + ']'
        print "\t%s = %s;" % (token[0], scilabBoolean(token[1]))
    elif token[1][0].isdigit() or (token[1][0] in ('-', '+') and token[1][1].isdigit()):
        token[1] = '[' + token[1] + ']'
        print "\t%s = %s;" % (token[0], scilabDouble(token[1]))
    elif token[1][0] == '[':
        tokenAnalyser(token)
    else:
        epsilon(token)

# -------------- FUNCTION --------------#
def argAnalyser(token):
    if token[0] == '\"':
        token = '[' + token + ']'
        return scilabString(token)
    elif token[0] == '%':
        token = '[' + token + ']'
        return scilabBoolean(token)
    elif token[0].isdigit() or (token[0] in ('-', '+') and token[1].isdigit()):
        token = '[' + token + ']'
        return scilabDouble(token)
    elif token[0] == '[':
        if token[1] == '\"':
            return scilabString(token)
        elif token[1] == '%':
            return scilabBoolean(token)
        elif token[1].isdigit() or (token[0] in ('-', '+') and token[1].isdigit()):
            return scilabDouble(token)
        elif token[1] == '[':
            return argAnalyser(token[1:])
        else:
            return token
    else:
        return token


# -------------- FUNCTION FOR PUSHING IN AN ARRAY--------------#
def diagram(token):
    temp_str = ""
    token[0] = re.sub("(\(\d+\))", "", token[0])
    temp_str = temp_str + token[0]

    return temp_str


# -------------- FUNCTION FOR HANDLING EDGE CASES--------------#
def epsilon(token):
    leftStr = token[0]
    rightStr = token[1]
    pushFlag = 0

    if rightStr in varList.keys():
        varType = re.search("(Scilab\w+)", argAnalyser(varList[rightStr]))

        if not varType:
            rightStr = rightStr
        elif varType.group(1) == "ScilabString":
            rightStr = "new ScilabString([" + rightStr + "])"
        elif varType.group(1) == "ScilabDouble":
            rightStr = "new ScilabDouble([" + rightStr + "])"
        elif varType.group(1) == "ScilabBoolean":
            rightStr = "new ScilabBoolean([" + rightStr + "])"

    if re.search("(\d)", token[0]):
        pushFlag = 1
        leftStr = diagram(token)

    if re.search(r".?list(?![^(]*\))", token[1]):
        rightStr = listCheck(token)

    elif re.search("scicos_link", token[1]):
        rightStr = "scicos_link({"
        rightStr += ','.join(scicosLink(token)) + "})"

    elif re.search("standard_define", token[1]):
        rightStr = "new standard_define(" + ','.join(standard_define(token)) + ")"

    if pushFlag:
        print '\t' + leftStr + ".push(" + rightStr + ');'
    else:
        print '\t' + leftStr + '=' + rightStr + ';'



# -------------- FUNCTION FOR SCILAB LISTS--------------#
def listCheck(token):
    args = []
    listType = re.search("(.?list)", token[1])
    arguments = re.search("^(.?list)\((.*)\)", token[1])

    if listType.group(1) == 'mlist' or listType.group(1) == 'tlist':
        argType = re.search("(\[.*?\])", token[1])
        token[1] = re.sub(r"\[.*?\]", "", token[1])
        args.append('new ScilabString(%s)' % argType.group(1))
        arguments = re.search("\((.*)\)", token[1])
        arguments = arguments.group(1).split(',')
        arguments = arguments[1:]

    else:
        try:
            if ',' in arguments.group(2):
                arguments = arguments.group(2).split(',')
        except:
            return token[1]
            #print "no arguments"
            #exit()

    # IF LIST IS NOT EMPTY
    if arguments and isinstance(arguments, collections.Iterable):
        for i in arguments:
            if i not in varList and i:
                args.append(argAnalyser(i))
            else:
                args.append(i)
    else:
        return token[1]

    args = listType.group(1) + '(' + ','.join(args) + ')'
    return args




#-------------- FUNCTION FOR HANDLING SCICOS LINK FUNCTION --------------#
def scicosLink(token):
    arguments = re.search("\((.*)\)", token[1])
    arguments = arguments.group(1).replace('=', ':')
    args = re.findall("(\w+:[0-9\[\]\.,\-]+)", arguments)

    argList = []
    for i in args:
        temp = re.findall(":([0-9\[\]\.,\-]+)", i)
        temp = temp[0]
        if temp.endswith(','):
            temp = temp[:-1]

        temp2 = re.findall("(\w+:)", i)
        temp2 = temp2[0]
        argList.append(temp2 + ' ' + argAnalyser(temp))

    return argList




#-------------- FUNCTION FOR HANDLING SCILAB BOOLEAN --------------#
def scilabBoolean(token):
    token = token.replace("[]", "")
    token = token.replace("%t", "true")
    token = token.replace("%f", "false")
    return "new ScilabBoolean(%s)" % token


#-------------- FUNCTION FOR HANDLING SCILAB DOUBLE --------------#
def scilabDouble(token):
    token = token.replace("[]", "")
    return "new ScilabDouble(%s)" % token


#-------------- FUNCTION FOR HANDLING SCILAB STRING --------------#
def scilabString(token):
    token = token.replace("[]", "")
    return "new ScilabString(%s)" % token


#-------------- FUNCTION FOR HANDLING STANDARD DEFINE FUNCTION --------------#
def standard_define(token):
    arguments = re.search("\w+\((.*)\)", token[1])
    arguments = arguments.group(1).replace(',', ' ', 1)
    arguments = arguments.split(',')
    arguments[0] = arguments[0].replace(' ', ',')
    arguments[0] = scilabDouble(arguments[0])

    return arguments


# -------------- FUNCTION FOR HANDLING CASES WHEN ARGUMENTS ARE INSIDE "[]"--------------#
def tokenAnalyser(token):
    if token[1][1] == '\"':
        print "\t%s = %s;" % (token[0], scilabString(token[1]))

    elif token[1][1] == '%':
        print "\t%s = %s;" % (token[0], scilabBoolean(token[1]))

    else:
        print "\t%s = %s;" % (token[0], scilabDouble(token[1]))



#-------------- GETTING ALL BLOCK NAMES --------------#
nameList= os.listdir("/home/karma/xcos/blocks_xcos") # PATH OF ALL XCOS BLOCK STORED IN .XCOS FORMAT
script_dir = os.path.dirname(__file__)
block_names=[]
for i in nameList:
    name=i[:-5]
    block_names.append(name)













sdir= "/home/karma/xcos/blocks_xcos"
for subdir, dirs, files in os.walk(sdir):
    for file in files:
        abs_file_path = os.path.join(subdir,file)
        f = open(abs_file_path,'r')
        val=f.read()
        x=re.search(r'\<(\w+).*interfaceFunctionName',val)
        if not x:
            x=re.search(r'\<(\w+).*simulationFunctionType',val)
            if x:
                mapping[file[:-5]]=x.group(1)
            else :
                print "error\t",file,"\n"
                exit()
        else:
            mapping[file[:-5]]=x.group(1)
















#-------------- SEARCHING FOR ALL SCI FILES OF XCOS BLOCKS --------------#
for subdir, dirs, files in os.walk(rootdir):
    for file in files:
        if file.endswith(".sci") and file[:-4] in block_names:
            key=file[:-4]
            f = open('%s.js' % file[:-4], 'w')
            #REDIRECTING STANDARD OUTPUT OF "print" STATEMENT TO .js FILE
            sys.stdout = f


            sci = ""

            abs_file_path = os.path.join(subdir, file)

            with open(abs_file_path, 'r') as content_file:
                for line in content_file:
                    contentLine = line.strip()

                    if contentLine:
                        # REMOVING SCILAB COMMENTS
                        contentLine = contentLine.split("//")
                        contentLine = contentLine[0]

                        # APPENDING A CONTINUOS SCILAB STATEMENT IN THE SAME LINE
                        if contentLine.endswith(".."):
                            contentLine = contentLine.strip("..\n")
                            sci += contentLine

                        elif contentLine:
                            sci += contentLine + '\n'

            # EXTRACTING FUNCTION NAME
            func_name = re.search("(\w+)\(job,arg1,arg2", sci)
            if func_name:
                print "function %s () {\n" % func_name.group(1)
            else:
                func_name = re.search("(\w+)\(job, arg1, arg2", sci)
                if func_name:
                    print "function %s () {\n" % func_name.group(1)
                else:
                    print sci
                    continue


            # SEARCHING FOR "case "define" " TO START PARSING FROM THERE TILL "end" STATEMENT
            if '"define" then' in sci:
                sci = sci.split("\"define\" then\n")
                sci = sci[1]
                sci = sci.split("\nend\n")[0]
                sci = sci.split('\n')
            elif 'case "define"' in sci:
                sci = sci.split("case \"define\"\n")
                sci = sci[1]
                sci = sci.split("\nend\n")[0]
                sci = sci.split('\n')
            else:
                print sci
                print "ERROR......case define is missing.......ERROR",file
                exit()



            sci2 = []
            line2append = ""
            flag = False

            for line in sci:

                if line.find('=') != -1:
                    temp = line.split('=',1)[1]
                else:
                    temp = line

                temp=temp.strip()

                if flag and (temp.endswith(']') or temp.endswith('];')):
                    flag = False
                    line2append += line
                    sci2.append(line2append)
                    line2append = ""

                elif flag:
                    line2append += line

                elif temp.startswith('[') and not (temp.endswith(']') or temp.endswith('];')):
                    flag = True
                    line2append = line

                else:
                    sci2.append(line)

            sci = sci2

            varList.clear()
            varList['this.x']="scicos_model()"



            #-------------- ANALYSING SCI FILE LINE BY LINE --------------#
            for line in sci:

                # REPLACING "string" FUNCTION OF SCILAB TO JAVASCRIPT EQUIVALENT OF "tostring" FUNCTION
                #line=re.sub(r"string\((.*?)\)",r"\1.toString()",line)


                # SPLITTING LINE FROM "=" SYMBOL
                if '=' in line:
                    token = line.split('=', 1)
                    token[0] = token[0].strip()
                    token[1] = token[1].strip()
                else:
                    print "\t",line
                    continue

                # EXTRACTING THE VARIABLE NAME
                token2 = token[0].split('.')

                if token2[0] == 'x':
                    token2[0] = "this.x"
                    token[0] = '.'.join(token2)

                if token[1].endswith(';'):
                    token[1] = token[1][:-1]
                    token[1]=token[1].strip()

                token[1] = re.sub(r"([^\"]) ",r"\1,",token[1])

                # HANDLING INVERSE ARRAYS
                token[1] = re.sub(r';(?![^"]*\")',r"],[",token[1])
                token[1] = re.sub(r"(\w+)\((.+)\:(.+)\)", r"...colon_operator(\1,\2,\3)", token[1])
                # HANDLING TRANSPOSE MATRIX
                token[1] = re.sub(r"(\w+)\(:\)\'", r"...transpose(\1)", token[1])
                token[1] = re.sub(r"(\[[\d\w]+:[\d\w]+\])\'", r"...transpose(\1)", token[1])
                token[1] = re.sub(r"(\w+)\(:\)", r"...\1", token[1])


                # IF NEW VARIABLE IS ENCOUNTERED
                if token2[0] not in varList.keys():
                    if len(re.findall("^\[.*\].*\[.*\]", token[1])):
                        token[1] = '[' + token[1] + ']'
                        print "\n\tvar %s = %s;" % (token2[0], token[1])
                    else:
                        print "\n\tvar %s = %s;" % (token2[0], token[1])
                    varList[token2[0]] = token[1]

                else:
                    Analyser(token)

            print "\treturn new ",mapping[key],"(this.x)"
            print '}'
            sys.stdout = orig_stdout
            f.close()

