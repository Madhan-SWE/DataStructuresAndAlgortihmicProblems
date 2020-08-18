/*

Jack is bored in english class and decides to play a game with you. He will ask you Q questions and in each question He will give you a string S Such that it has length at most 500. 
You have to tell him if the string can be partitioned into two substrings s1 and s2 such that
s1 is present in the dictionary
s2 is present in the dictionary
s1+s2 is equal to S

note that s1 could be equal to s2. They need not be distinct strings
The list of words in the dictionary will be given to you initially and using this answer Jack's questions.
 

Input Description:
The first line contains a single integer N denoting denoting the number of strings in the dictionary The next N lines contains a single string each denoting the words in the dictionary The next line contains a single integer Q : the number of questions you will be asked The next Q line contains a single string each which will be given to you

Output Description:
Your output must consist of Q lines , each of which you must answer with “Yes” if the string can be partitioned into two strings s1 and s2 as given in the problem statement Or “No” if the string cannot be partitioned

Sample Input :
3
ancd
hhgy
ytre
2
ancdhhgy
ancdoo
Sample Output :
Yes 
No

*/



class trieNode
{
    constructor(key)
    {
        this.value = undefined;
        this.isEnd = false;
        this.arr = new Array(26).fill(null);
        
    }
}

class trieTree
{
    
    constructor(key)
    {
        this.root = new trieNode();
    }
    
    
    insert(word, value)
    {
        //console.log("Inserting: ", word, "-", value);
        let node = this.root;
        for(let i=0;i<word.length; i++)
        {
            let idx = parseInt(word[i],36)-10;
            if(node.arr[idx]===null)
            {
                let temp = new trieNode();
                node.arr[idx]=temp;
                node = temp;
            }
            else
            {
                node = node.arr[idx];
            }
            
        }
        node.isEnd = true;
        node.value = value;
    }
    
    
    searchNode(str)
    {
        //console.log("Search for string: ", str)
        let node = this.root;
        for(let i=0;i<str.length;i++)
        {
            let idx = parseInt(str[i],36)-10;
            if(node.arr[idx]===null)
            {
                //console.log("Not full prefix found")
                return false;
            }
            node = node.arr[idx];   
        }
        if(node.isEnd===true && node.value===str)
        {   
            //console.log("====== True =======")
            return true
        }
        //console.log("Full Prefix found! String not found");
        //console.log("node.isEnd: ", node.isEnd);
        //console.log("node.value: ", node.value);
        return false;
    }
    
}

function isPartOf(input, trie)
{
    let x = input.length;
    for(let i=1;i<x;i++)
   {
      let s1 = input.slice(0,i);
      let s2 = input.slice(i,x);
      //console.log("S1: ", s1, "\t", "S2: ", s2);
      
      if(trie.searchNode(s1) && trie.searchNode(s2))
      {
          return true;
      }
   }
   return false;
    
}

// Getting input via STDIN
const readline = require("readline");

const inp = readline.createInterface({
  input: process.stdin
});

const userInput = [];

inp.on("line", (data) => {
  userInput.push(data);
});

inp.on("close", () => {
  let trie = new trieTree();
  /*
  
      trie.insert("Madhan", "Madhan");
      trie.insert("Kumar", "Kumar");
      console.log(trie);
      console.log(trie.searchNode("Madhan"))
  
      let input = "MadhanKumar";
      console.log(isPartOf(input, trie)?"Yes":"No")
      console.log(isPartOf("James", trie)?"Yes":"No")
      console.log(userInput);

  */

  let n = +userInput[0];
  for(var i=1;i<=n;i++)
  {
      trie.insert(userInput[i], userInput[i]);
  }
  let q = +userInput[n+1];
  for(var i=n+2;i<=(n+1+q);i++)
  {
      console.log(isPartOf(userInput[i], trie)?"YES":"NO")
  }
});




/*


TESTCASES:

Testcase Status:
>>> success
Input:
7
kvydfjibddihqi
vpabiyx
msruiaefkzfne
xhrcsbuavsrvvz
slimef
ejbqkgfrueynjqod
jvjfqi
6
ejbqkgfrueynjqodvpabiyx
vpabiyxjvjfqi
gztxmzedvjdjsux
slimefmsruiaefkzfne
xhrcsbuavsrvvzjvjfqi
msruiaefkzfnekvydfjibddihqi
Expected Output:
YES
YES
NO
YES
YES
YES
Actual Output:
YES
YES
NO
YES
YES
YES
Execution Time:
>>> 0.074s
Memory Used:
>>> 8368kb

Testcase Status:
>>> success
Input:
310
qzjpiynypdid
eop
zupiv
tjtrmsbila
aluqljttnbzbsx
mokjhf
cxfx
pkblkofczpyuc
uftthfhrpqyitvp
wgcxuolz
mqpiuqczjvgoez
vapqxektnmshcfgtt
kctagt
ebcidhfdxvadfwstq
wwirp
ctceaxse
umedsj
plgxhasycowk
ntmhv
hviluexair
kjwsgg
yevpc
xpcjwzbdu
oqooqwhbjqybweuxk
moyjdauaavfuhw
ykdwthfkfhild
xxrlvcqyysa
ywdwhbgnabuflbo
ouznrtamvqmulm
jjt
sxnhxqbece
wsnxheq
soafiltawc
dxs
eriiykmtihiiom
wgmynwjjwhnu
koergmzgzlzjshtj
uhdifrfqadxpxjam
rudqcc
boyihjfbqi
xbrndwm
wxtimmepegujjk
ttqyxiijfkcunyi
ufdetpkl
qffbrou
hujrdsx
utctclpjouf
eqdxxiy
zvaipkzscyhzumuyz
hnf
vkezjdjjtk
usugumkuwjoif
hpwwwkug
vrwgbqrfmlzsfo
cmqqw
ffkbd
nxpes
dzktsrhdrblhf
vvfrrkwdlzmzze
rpkszdmqmq
ndstsnqxejicp
edwdhewwop
udqgtb
ywpqjfoqpyug
yjsb
wyp
ppesh
oihog
fqbvisvcyqbii
becsrtjxmqicb
qhnxzpshhnmigpqot
vylmrvlfnujolawzz
qshzhth
kzeduzd
nvdycqum
iodjpczhjarckgol
sglxm
spxxhtlobbrkq
lafmtkyzyjmspx
dwkuvhcouqsvkco
qolejvciulwmbuc
spznwbdrtvoda
jqsvubsw
ojibkefr
usltv
mooauofdgzac
varjkbmwgspeohs
clv
zylqfqy
tbjodcxpemmmebsul
gnxbgxbtpiknpfqyv
bulhgztmdnh
anbxqkwud
cpzrwrsrnvmbcsaxf
kotmbxkthgpmss
tjymbqcyedcwdz
jmp
ysb
oirdvlvzghzskrujv
lsdntozl
zduktedx
osawbcomt
vpkihpv
dwnwytskmwnjydeaz
cptwcql
zuewyitogthyd
wqhwvnxuubloxoek
fghcfrxvxqcx
zwl
sgtrcotnesdifgol
sshpnhhrgarcn
xtvov
jkncoxhwn
mfpuucbbuh
nmqmjlhzisjvhl
fuhuq
afqwitaecdtowhz
rzsjipt
aarh
hduntrxmtdrwwfu
hgugagqpzlpz
wvlaqavjxkc
bayixcrdyx
epsdajegfashsu
dspfushtcexujvtm
jgflpks
mmgeglhac
vwxqbc
vniqaiziqlaafxor
sxtba
rxuonvscs
kiivislvsnarb
xvqqwsnppj
eeyg
grhoorizmbmms
frkxhisxxhgcmn
slilsyzj
yvimjcbqulqdticsr
vfwxyhg
cgllnjjx
ucbnwndbi
gdepy
nxkwfvymgmzsxzsr
tezihc
wiudxupmtzjzw
ldxmxulpmoi
nraqkyyg
yaqktrvuohhre
ozhfnwnfle
bogcujawamsrimfr
yxqoyz
lvhthnakcgmysm
szpljdraxrzpgypz
mictwfgynsyfhvx
kjroctntsfbqub
gjecflkfzcg
jberonkcrdrkywoq
pszazdiknpjrv
dzuunhhramimk
abzpvasudahsrqkni
mcjblqsl
ayphyshqo
iknkrhbktqsiev
fgmxs
yshhqbqgraocp
vycfssaaxvue
hcxac
hjglco
efgtferhjlclobi
fmrhlslbbxjozx
dcbyifrrrdv
twldezx
krzluwujxu
cwdcgltycyterspv
qslblkmfijofd
jbylijhgl
bpbvhyt
sfadrniayxh
rtepgmynulvwdytm
nloumrlbznzyxeq
ifwxgmrtjpwhjkd
wrqikdjjrkiooyg
fev
qnfzcdiloljk
buofdawnimdiu
nyxbrkgsolbc
ollvnhju
lsztecbagr
dsrpakfllh
bva
iiicutuupaysag
albsabci
ppeskgruozyluuhl
fewopxztrcw
klkzre
yvgmwfxt
eew
kscarbv
drfnfrpwwburhhqog
onpmbaedc
gxikqozvfosdr
xbvnpewftnrwnyzry
qgrj
teejwhbleeit
mrbf
ubuscoqmg
dpvyubis
lfppoliaclijgleaq
rcashq
gkrqecbktqyeaajm
suwyuosnqtfzlvhvm
bqylj
jqrmzfwtzsuvgmj
hoaslhp
frpdezwqpncquylvr
qzuzadqawbhn
ogqulrqbiddyzdmu
rkwlmy
eynfhciy
zsw
izz
ezmhngefs
sga
kayqjdahozzmsjl
wrukyiseplg
tgtegtwqwwxm
zyqillhef
dnkjexqmqw
ufasvzrulptkhe
slczchpm
tlgf
foykprfoiz
zvlgzjaknzouod
iotpqyerivknju
ktlwbmhbyua
qpqazevoxtuqbp
qyuhlpujq
qrfmrsc
kehrayqtsgx
gpkcy
rtehawyf
pamykrhdthtma
lmhdwjbuauyhuxf
fxcsxol
ueonsqpecwjyikuif
sbqzdxwh
vyccugqhzgyfixoif
dpfyjj
jmph
hdwjhqsxzrfaypxmx
mcv
cfduorkxptclc
dwifnnflcczciogdi
ilfycrwsky
pkjlsoz
vmkzoohcvkkgv
ltzdrr
szeciquyrctdps
dzva
hggeuceztxolwtngj
ecozfdtbjsyjggsom
qsnmsdzqwnxhzd
pdrtwu
rsnzyfnntgf
sxmroign
hqd
vws
qwnjlmjtbwo
exbbjvrtdgnlxrku
cqea
nlrygv
vebsgcddwyg
mrbdbysfoyfuntlm
gjulkototwm
cpewsjzqdfhcmbpho
hxmdkyudnn
zhfqlb
wbd
ikew
vecznznq
omqdcrejwvv
itdlvnwzjlvnnw
oltzzhpcjihtfeqh
jkzfxxegjbwwzyn
tomb
pmmyftevashk
mjpsqawow
mliiavjgmvsmdo
aoihbbvksqcs
qrj
csncpyidvdparf
hpiksgxlwb
ksuv
zpob
omhjrwmk
ntuxenddazedly
hxzwnabbokn
jzromll
pypuaoydcxd
wefkhilvv
dezuunffxwfm
fcrlgoopkvxwch
xckcikxdxeiwbo
tvpkgva
llskjurtruewe
thnzqkcguwbjiihjf
wxefrvzkrfgwtbdi
vsd
pbfamphvubtt
ykdzwugfsbgwk
35
abzpvasudahsrqknizvaipkzscyhzumuyz
nloumrlbznzyxequhdifrfqadxpxjam
uetdbnfuimvup
kdvceeao
nmqmjlhzisjvhlusugumkuwjoif
ozxidqofftb
hxmdkyudnnanbxqkwud
wsnxheqjbylijhgl
eeygppesh
fghcfrxvxqcxwwirp
udqgtbplgxhasycowk
oxfc
nbubgbw
dgzabajzzxecl
yevpcvycfssaaxvue
utctclpjoufslilsyzj
jberonkcrdrkywoqsga
afcdbmv
yxqoyzmjpsqawow
vniqaiziqlaafxoryshhqbqgraocp
hnfexbbjvrtdgnlxrku
ybavynp
fgjbipdnqpi
hxmdkyudnnsshpnhhrgarcn
cpzrwrsrnvmbcsaxfcpewsjzqdfhcmbpho
aogbphwpwmpbt
thnzqkcguwbjiihjfpkjlsoz
vpkihpvysb
oesykbfozk
tvpkgvahujrdsx
aqv
mayjnuqpumjkqdk
qof
utzat
qwj
Expected Output:
YES
YES
NO
NO
YES
NO
YES
YES
YES
YES
YES
NO
NO
NO
YES
YES
YES
NO
YES
YES
YES
NO
NO
YES
YES
NO
YES
YES
NO
YES
NO
NO
NO
NO
NO
Actual Output:
YES
YES
NO
NO
YES
NO
YES
YES
YES
YES
YES
NO
NO
NO
YES
YES
YES
NO
YES
YES
YES
NO
NO
YES
YES
NO
YES
YES
NO
YES
NO
NO
NO
NO
NO
Execution Time:
>>> 0.083s
Memory Used:
>>> 9652kb


*/