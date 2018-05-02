<template>
	<!-- 主体内容 -->
	<div style="padding:24px;">
		<h1 class="user-header">编辑资料
			<small> —— Edit Profile</small>
		</h1>
		<br/>
		<div>
			<form class="layui-form">
                <div class="layui-form-item">
                    <label class="layui-form-label">头像</label>
                    <div class="layui-input-inline">
                        <img class="imgIcon" v-if="user.iconPath != null" :src="this.$http.options.root + user.iconPath" alt="头像">
                        <img class="imgIcon" v-else src="static/images/default_icon.png" alt="头像">
                        <br><br>
                        <button type="button" class="layui-btn layui-btn-sm" id="uploadNewIcon">
                            <i class="layui-icon">&#xe67c;</i>上传新头像
                        </button>
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">昵称</label>
                    <div class="layui-input-inline">
                        <input type="text" name="nickName" v-model="user.nickName" placeholder="请输入新昵称" autocomplete="off" class="layui-input"/>
                    </div>
                    <div class="layui-form-mid layui-word-aux">限定长度1-18</div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">性别</label>
                    <div class="layui-input-block">
                        <input class="radioSex" type="radio" name="sex" value="1" title="男" v-model="user.sex">
                        <input class="radioSex" type="radio" name="sex" value="2" title="女" v-model="user.sex">
                        <input class="radioSex" type="radio" name="sex" value="3" title="保密" v-model="user.sex">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">公开博客</label>
                    <div class="layui-input-inline">
                        <input id="switchPublic" type="checkbox" name="isPublic" v-model="user.isPublic" lay-skin="switch" checked>
                    </div>
                    <div class="layui-form-mid layui-word-aux">非公开博客其他用户无法浏览</div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">个性签名</label>
                    <div class="layui-input-block">
                        <input type="text" name="signature" v-model="user.signature" placeholder="长度不超过128个字符" autocomplete="off" class="layui-input"/>
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-input-block">
                        <button class="layui-btn" lay-submit="" lay-filter="formEditProfile">确认保存</button>
                    </div>
                </div>
            </form>
		</div>
	</div>
</template>


<script>

export default {
	name: "UserCMD_EditProfile",
	data() {
		return {
            user: {}
        };
	},
	mounted() {
		var Vue = this;

		layui.use(['element', 'layer', 'form', 'upload'], function () {
            Vue.element = layui.element;
            Vue.layer = layui.layer;
            Vue.form = layui.form;
            Vue.upload = layui.upload;

            var load = Vue.layer.load(1);
			Vue.$http.get("api/user/info")
                .then((res) => {
                    Vue.layer.close(load);

                    var result = res.body;
					
					if(result.success){
						result.data.gmtCreate = new Date(result.data.gmtCreate * 1000).Format("yyyy年MM月dd日 hh:mm:ss");
                        Vue.user = result.data;
                        
                        // 公开博客开关赋初值
                        if(result.data.isPublic) $("#switchPublic").prop("checked", "checked");

                        // 性别单选赋初值
                        let radioSex = $(".radioSex[value='" + result.data.sex + "']");
                        if(radioSex) radioSex.prop("checked", "checked");

                        var uploadInstance = Vue.upload.render({
                            elem: '#uploadNewIcon' //绑定元素
                            ,url: Vue.$http.options.root + 'api/user/icon/upload' //上传接口
                            ,done: function(res){
                                if(res.success){
                                    Vue.user.iconPath = res.data;
                                    
                                    Vue.layer.msg("上传成功");
                                }else{
                                    Vue.layer.msg(res.msg);
                                }
                            }
                            ,error: function(){
                                
                            }
                        });

                        Vue.form.render();
                        Vue.$localStorage.set("user", JSON.stringify(result.data));
					}else{
						Vue.layer.msg(result.msg);
					}
                },
                (err) => {
                    Vue.layer.close(load);
                    Vue.layer.msg("网络异常");
                });

            // 确认修改
            Vue.form.on('submit(formEditProfile)', function (data) {
                var load = layer.load(1);

                // 未填的参数默认值
                data.field.iconPath = Vue.user.iconPath;
                data.field.isPublic = data.field.isPublic === "on";
                data.field.sex = data.field.sex || 0;

                Vue.$http.post("api/user/info", data.field)
                    .then((res) => {
                        Vue.layer.close(load);

                        var result = res.body;
                        
                        if(result.success){
                            Vue.layer.msg("修改成功");
                            Vue.$router.go();
                        }else{
                            Vue.layer.msg(result.msg);
                        }
                    },
                    (err) => {
                        Vue.layer.close(load);
                        Vue.layer.msg("网络异常");
                    });

                return false;
            });
        });
    },
    methods: {
        
    }
};
</script>

<style scoped>
.imgIcon{
	width: 128px;
	height: 128px;
}
</style>
