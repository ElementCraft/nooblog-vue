<template>
	<!-- 主体内容 -->
	<div style="padding:24px;">
		<h1 class="user-header">个人资料
			<small> —— Profile Info</small>
		</h1>
		<br/>
		<div class="layui-col-md6 layui-col-lg6">
			<ul class="layui-timeline">
				<li class="layui-timeline-item">
					<i class="layui-icon layui-timeline-axis">&#xe63f;</i>
					<div class="layui-timeline-content layui-text">
						<h3 class="layui-timeline-title">头像</h3>
						<img class="imgIcon" v-if="user.iconPath != null" :src="this.$http.options.root + user.iconPath" alt="头像">
                        <img class="imgIcon" v-else src="static/images/default_icon.png" alt="头像">
					</div>
				</li>
				<li class="layui-timeline-item">
					<i class="layui-icon layui-timeline-axis">&#xe63f;</i>
					<div class="layui-timeline-content layui-text">
						<h3 class="layui-timeline-title">帐号</h3>
						<p>{{user.account}}</p>
					</div>
				</li>
				<li class="layui-timeline-item">
					<i class="layui-icon layui-timeline-axis">&#xe63f;</i>
					<div class="layui-timeline-content layui-text">
						<h3 class="layui-timeline-title">昵称</h3>
						<p>{{user.nickName}}</p>
					</div>
				</li>
				<li class="layui-timeline-item">
					<i class="layui-icon layui-timeline-axis">&#xe63f;</i>
					<div class="layui-timeline-content layui-text">
						<h3 class="layui-timeline-title">性别</h3>
						<p v-if="user.sex == 1">男</p>
						<p v-else-if="user.sex == 2">女</p>
						<p v-else-if="user.sex == 3">保密</p>
						<p v-else>未知</p>
					</div>
				</li>
				<li class="layui-timeline-item">
					<i class="layui-icon layui-timeline-axis">&#xe63f;</i>
					<div class="layui-timeline-content layui-text">
						<h3 class="layui-timeline-title">个性签名</h3>
						<p v-if="user.signature == null">无</p>
						<p v-else>{{user.signature}}</p>
					</div>
				</li>
				<li class="layui-timeline-item">
					<i class="layui-icon layui-timeline-axis">&#xe63f;</i>
					<div class="layui-timeline-content layui-text">
					<div class="layui-timeline-title">菜鸟博客 &copy;</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="layui-col-md6 layui-col-lg6">
			<ul class="layui-timeline">
				<li class="layui-timeline-item">
					<i class="layui-icon layui-timeline-axis">&#xe63f;</i>
					<div class="layui-timeline-content layui-text">
						<h3 class="layui-timeline-title">博客状态</h3>
						<p v-if="user.isPublic" style="color:green;">公开</p>
						<p v-else style="color:red;">私密</p>
					</div>
				</li>
				<li class="layui-timeline-item">
					<i class="layui-icon layui-timeline-axis">&#xe63f;</i>
					<div class="layui-timeline-content layui-text">
						<h3 class="layui-timeline-title">实名认证情况</h3>
						<p v-if="user.authenticated" style="color:green;">已完成实名认证</p>
						<p v-else style="color:red;">未实名认证</p>
					</div>
				</li>
				<li class="layui-timeline-item">
					<i class="layui-icon layui-timeline-axis">&#xe63f;</i>
					<div class="layui-timeline-content layui-text">
						<h3 class="layui-timeline-title">注册邮箱</h3>
						<p>{{user.email}}</p>
					</div>
				</li>
				<li class="layui-timeline-item">
					<i class="layui-icon layui-timeline-axis">&#xe63f;</i>
					<div class="layui-timeline-content layui-text">
						<h3 class="layui-timeline-title">注册时间</h3>
						<p>{{user.gmtCreate}}</p>
					</div>
				</li>
				<li class="layui-timeline-item">
					<i class="layui-icon layui-timeline-axis">&#xe63f;</i>
					<div class="layui-timeline-content layui-text">
						<h3 class="layui-timeline-title">积分</h3>
						<p>{{user.score}}</p>
					</div>
				</li>
				<li class="layui-timeline-item">
					<i class="layui-icon layui-timeline-axis">&#xe63f;</i>
					<div class="layui-timeline-content layui-text">
					<div class="layui-timeline-title">菜鸟博客 &copy;</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: "UserCMD_Profile",
	data() {
		return {
			user:{}
		};
	},
	mounted() {
		var Vue = this;

		layui.use(["element", "form", "layer"], function() {
			Vue.element = layui.element;
			Vue.form = layui.form;
			Vue.layer = layui.layer;
			
			var load = Vue.layer.load(1);
			Vue.$http.get("api/user/info")
                .then((res) => {
                    Vue.layer.close(load);

                    var result = res.body;
					
					if(result.success){
						result.data.gmtCreate = new Date(result.data.gmtCreate * 1000).Format("yyyy年MM月dd日 hh:mm:ss");
						Vue.user = result.data;
					}else{
						Vue.layer.msg(result.msg);
					}
                    
                },
                (err) => {
                    Vue.layer.close(load);
                    Vue.layer.msg("网络异常");
                });

		});
	}
};
</script>

<style scoped>
.imgIcon{
	width: 96px;
	height: 96px;
}
</style>
