<template>
    <div class="login">
        <div class='login-content'>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from '../common/js/axios'
    import * as types from '../store/mutation-types'
    import { mapMutations } from 'vuex'
    import {setToken} from '../common/js/storage'
    export default {
        data () {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空'));
                } else if (value.length < 6) {
                    callback(new Error('密码长度不能小于6位'));
                } else {
                    callback();
                }
            };
            var validateUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('用户名不能为空'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    pass: '',
                    username: ''
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkUsername: [
                        { validator: validateUsername, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = {
                            username: this.ruleForm.username,
                            password: this.ruleForm.pass
                        }
                        axios.post('/login', data).then((res) => {
                            if (res.data.code === 200) {
                                const result = res.data.result
                                this.setToken(result.token)
                                setToken(result.token)
                                this.$router.push('/')
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'error',
                                    center: true
                                })
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                    } else {
                        return false;
                    }
                });
            },
            resetForm (formName) {
                this.$refs[formName].resetFields();
            },
            ...mapMutations({
                'setToken': types.SET_TOKEN
            })
        }
    }
</script>

<style scoped lang='stylus'>
    .login
        position absolute
        left 0
        top 0
        right 0
        left 0
        width 100%
        height 100%
        background-image url('http://pic.sc.chinaz.com/files/pic/webjs1/201609/jiaoben4534.jpg')
        .login-content
            width 50%
            margin 15% auto
            .demo-ruleForm
                width 80%
                .el-button--default
                    margin-left 40px
</style>
