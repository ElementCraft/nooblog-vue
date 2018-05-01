<template>
	<!-- 主体内容 -->
	<div style="padding: 15px;">内容主体区域</div>
</template>

<script>
export default {
	name: "UserCMD_Index",
	data() {
		return {};
	},
	mounted() {
		var Vue = this;

		layui.use(["element", "form", "layer"], function() {
			var element = layui.element;
			var form = layui.form;
			var layer = layui.layer;
			var $ = layui.jquery;

			// 管理员登录提交
			form.on("submit(formAdminLogin)", function(data) {
				var load = layer.load(1);

				$.ajax({
					url: Vue.globals.BaseUrl + "/api/user/login",
					type: "POST",
					data: JSON.stringify(data.field),
					traditional: true,
					dataType: "json",
					contentType: "application/json;charset=UTF-8",
					headers: {
						"Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3amgxMjMiLCJhdXRocyI6IiIsImlzcyI6Im5vb2J1Zy5jb20iLCJleHAiOjE1MjM0NDgwOTh9.oZWy2TGyLUf4hJyyn_OCWPLOS129r7Z4-e5Nndwd2xc"
					},
					success: function(data) {
						layer.close(load);
						if (data.success) {
							this.$router.push("/admin/");
							return false;
						} else {
							layer.msg(data.msg);
						}
					}
				});

				return false;
			});
		});
	}
};
</script>

<style scoped>
body {
	background-color: lightblue;
}
</style>
