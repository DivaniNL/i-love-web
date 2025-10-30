# i-love-web

Learning journal, blog, digital gardening

De instructie voor de I Love Web vind je in: [INSTRUCTIONS](https://github.com/fdnd-task/i-love-web/blob/main/docs/INSTRUCTIONS.md)


## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).


# Performance now

## pacman rule

hier gelde de pacman regel op de conventies.
altijd tijden het praten in groepen ruimte over laten


# Tammy everts - how fast is fast enough

- fast is magical (catherine Jue, co founder at kernal)

-fast is pragmatic - fast enough to improvw buainess metrics
if there is no ROI, there is no point in making it faster

pragmagical?

the space between pragmatix and magical, as small as possible

## who are you trying to please

make your boss happy, make google happy, your users etc.

### Your boss

people believe that if the company is good enough, peopel dont care about the speed

- slow site = fewer convertions
when the speed ia normal now, the people who had slow theottle of the experiment still had low return rate

performance plateau starts at 2.8s lcp. that is the threshold

### Google

they reccomend to have good core web vitals for searxh

CWV is a starting point, not a finish line

google thresholds is not your business threshold

200ms is good interaction next paint for google

aiming for someone elses metrics is not working

### Your users

metrics do not equal feeling when regarding page speed


kara pernice~ ppl spending a long time on the sote clicking a lot of ljnka visitinf many pages means 
either they are engaged or lost

a usablity test and site analytics pairing for good research

## engagement tasks and prductivity tasks

engagement task:
open ended-absorbing
high tolerance for waiting
like booming a holiday

productivity tasks
frame of mind is different
no tolerance for waiting

so same users, same clicks but different experience

sander van surkum - one alow step can make whole journey feel slow

pagmatic is what your site needs
magical - 100ms

so,

know who to pelase
know why usrrs on ur aitw (engagement or productive)

# Harry Roberts - how to think like a performance engineer
csswz.it/think (slides)
csswizardry

## tools of the trade

### crux (chrome iser experience report)

crux democrised wepperf

when you install chrome it asks are u ok with grabbunf telematry
chrome will measure the speed of the metrics of the sites u visit

### treo

graphical way to loom at data

### webpagetest

the gold standard in performance engineering
its a wrap up around devtools

## the metrics that matter

- agree on what ur benchmarking


## core wb vitals

-lcp
 useful for ecommerce site. 
-inp
does it geel aluggiaxh after loading
-cls
non time based metrix

## enabler metrica

- time to first byte

a bad ttfb will always mean a slower fcp and lcp

a good ttfb doesnt mean ur site is fast but a bad trfb is always a alow experience

ttfn is a black hole. debugging it is difficult

- domcontentloaded
this fires that your deferred ja has finished loading

if the lcp is done (lets say 2.5s) and the domcontent loaded is 3.8 seconds. there is a 1.3s gap where things wont work (frustartion) like the hamburger menu that doesnt work

## reliable realistic or repeatable

pick three

- test conditions

what sort of:
urls
device type
connection speed
geographix locale
do we test

url - easy (you know your urls)
device type - know your users
connection speed - most tools run too slowly(lighthouse of bad internet connection)
in webpage test a lot of options for connections speed
geographic locale - only matters if you have users more apread out over the world


## cold start scenarios

we focus on the worst case scwnario

most tools start fron peasimsitic baseline

if you go to the garget page directly thrre is no caching
use routing that is logical, the path that users take to get to the key page

a redirect could reduce the ttfb

write a script on webpagetest


