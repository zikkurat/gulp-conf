# -*- coding:utf-8 -*-

import os,glob
from xml.etree import ElementTree

print 

# fs=glob.glob('./*.conf.js')
fs=glob.glob(os.path.split(os.path.realpath(__file__))[0]+'/*.conf.js')
conf=[]

for f in fs:
	file=open(f)
	tree=ElementTree.parse(file)
	caption=tree.findall('.//caption')[0].text
	content=tree.findall('.//content')[0].text
	conf.append((caption,content))
	file.close()

def printInfo():
	#print '选择要进行的项目：'.decode('utf-8')
	print '-----------------------------------------------------'

	for i in range(len(conf)):
		print '%d. %s' % (i,conf[i][0])
		print '-----------------------------------------------------'

	return raw_input('$>')

def writeConf():
	idx=int(printInfo())
	f=open('../gulpfile.js','wb')
	f.write(conf[idx][1].encode('utf-8'))
	f.close()
	print 'NO. %d is ready! start now.' % idx
	os.system('gulp')

writeConf()
