# -*- coding:utf-8 -*-
import urllib
import urllib2
import re
import thread
import time

class QSBK:
    def __init__(self):
        self.pageIndex = 1
        self.user_agent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
        #初始化headers
        self.headers = { 'User-Agent' : self.user_agent }
        #存放段子的变量，每一个元素是每一页的段子们
        self.stories = []
        #存放程序是否继续运行的变量
        self.enable = False
    def getPage(self, pageIndex):
        try:
            url = 'http://www.qiushibaike.com/hot/page/' + str(pageIndex)
            request = urllib2.Request(url, headers = self.headers)
            respone = urllib2.urlopen(request)
            pageCode = respone.read().decode('utf-8')
            return pageCode
        
        except urllib2.URLError, e:
            if hasattr(e, 'reason'):
                print u"error", e.reason
                return None
    
    def getPageItems(selt, pageIndex):
        pageCode = self.getPage(pageIndex)
        if not pageCode:
            print "jiazaishibai"
            return None
        pattern = re.compile('<div.*?author">.*?<a.*?<img.*?>(.*?)</a>.*?<div.*?'+
                         'content">(.*?)<!--(.*?)-->.*?</div>(.*?)<div class="stats.*?class="number">(.*?)</i>',re.S)

        items = re.findall(pattern, pageCode)
        pageStories = []
        for item in items:
            haveImg = re.search('img', item[3])
            if not haveImg:
                replaceBR = re.compile('<br/>')
                text = re.sub(replaceBR, '\n', item[1])
                pageStories.append([item[0].strip(), text.strip()])
        return pageStories
    def loadPage(self):
        if self.enable == True:
            if len(self.stories) < 2:
                pageStories = self.getPageItems(self.pageIndex)