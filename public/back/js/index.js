$(function(){
    //1.基于准备好的dom对象 的echart实例
    var myChart = echarts.init(document.querySelector(".echarts_left"));
    var myChartRight = echarts.init(document.querySelector(".echarts_right"));

    //2.指定图表的配置项和数据
    var option = {
        title: {
            text: '2019年注册人数'
        },
        //提示框组件
        tooltip: {},
        //图例
        legend: {
            data:['人数','销量']
        },
        //x轴对于的数据刻度,没配置,根据数据动态生成比较合适
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        //y轴对于的数据刻度,没配置,根据数据动态生成
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',//bar折线图  柱状图 line
            data: [5, 20, 36, 10, 10, 20]
        }]
    };
    var optionRight = {
        title : {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    //3.使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    myChartRight.setOption(optionRight);


});
