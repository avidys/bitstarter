/* AG-master 13.06.25-24 (2013-06-25 11:42:54 PDT) */
rsinetsegs=['D08734_70068','D08734_70625','D08734_70105','D08734_70675','D08734_72008','D08734_72083','H07707_0'];
                var rsiExp=new Date((new Date()).getTime()+2419200000);
                var rsiDom='.nytimes.com';
                var rsiSegs="";
                var rsiPat=/.*_5.*/;
		var i=0;
                for(x=0;x<rsinetsegs.length&&i<35;++x){if(!rsiPat.test(rsinetsegs[x])){rsiSegs+='|'+rsinetsegs[x];++i;}}
                document.cookie="rsi_segs="+(rsiSegs.length>0?rsiSegs.substr(1):"")+";expires="+rsiExp.toGMTString()+";path=/;domain="+rsiDom;
                if(typeof(DM_onSegsAvailable)=="function"){DM_onSegsAvailable(['D08734_70068','D08734_70625','D08734_70105','D08734_70675','D08734_72008','D08734_72083','H07707_0'],'h07707');}