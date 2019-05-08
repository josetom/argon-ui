<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <img alt="logo" class="logo" src="@/assets/logo.png" />
          <span class="title">Argon</span>
        </div>
        <div class="desc">The Argon Project</div>
      </div>
      <div class="login">
        <a-form @submit="handleSubmit" :form="form">
          <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">
            <a-tab-pane tab="Sign In" key="1">
              <a-form-item>
                <a-input
                  v-decorator="[
                    'email',
                    { rules: [{ required: true, message: 'Please input your email id!' }] }
                  ]"
                  placeholder="john.doe@argon.com"
                >
                  <a-icon
                    slot="prefix"
                    type="user"
                    style="color: rgba(0,0,0,.25)"
                  />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input
                  v-decorator="[
                    'password',
                    { rules: [{ required: true, message: 'Please input your Password!' }] }
                  ]"
                  type="password"
                  placeholder="password"
                >
                  <a-icon
                    slot="prefix"
                    type="lock"
                    style="color: rgba(0,0,0,.25)"
                  />
                </a-input>
              </a-form-item>
            </a-tab-pane>
          </a-tabs>
          <div>
            <a-form-item>
              <a-checkbox
                v-decorator="[
                  'savePassword',
                  {
                    valuePropName: 'checked',
                    initialValue: true,
                  }
                ]"
              >
                Save Password
              </a-checkbox>
              <a style="float: right">Forgot Password</a>
            </a-form-item>
          </div>
          <a-form-item>
            <a-button :loading="isLoginProcessing" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">Sign In</a-button>
          </a-form-item>
          <div>
            Connect with us
            <a-icon class="icon" type="facebook" />
            <a-icon class="icon" type="instagram" />
            <a-icon class="icon" type="twitter" />
            <router-link style="float: right" to="/register" >Sign Up</router-link>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import RestClient from '@/utils/rest-client'

@Component({
  name: 'Login'
})
export default class Login extends Vue {
  form: any
  isLoginProcessing: boolean = false

  beforeCreate () {
    this.form = this.$form.createForm(this)
  }

  handleSubmit (e: Event) {
    e.preventDefault()
    this.form.validateFields((err:any, values:any) => {
      if (!err) {
        this.isLoginProcessing = true
        new RestClient().post('/login', values)
          .then((res:any) => {
            console.log(res.data)
            const user = res.data.user
            debugger
            this.$store.commit('user/setUser', user)
            this.isLoginProcessing = false
            // this.$router.push('/dashboard/workplace')
          }, (err: Error) => {
            this.$message.error(err.message || 'Invalid email / password')
          })
      }
    })
  }
}
</script>

<style lang="less" scoped>
 .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background: #f0f2f5 url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg') no-repeat center 110px;
    background-size: 100%;
    .content {
      padding: 32px 0;
      flex: 1;
      @media (min-width: 768px){
        padding: 112px 0 24px;
      }
      .top {
        text-align: center;
        .header {
          height: 44px;
          line-height: 44px;
          a {
            text-decoration: none;
          }
          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
          }
          .title {
            font-size: 33px;
            color: rgba(0,0,0,.85);
            font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0,0,0,.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }
      .login{
        width: 368px;
        margin: 0 auto;
        @media screen and (max-width: 576px) {
          width: 95%;
        }
        @media screen and (max-width: 320px) {
          .captcha-button{
            font-size: 14px;
          }
        }
        .icon {
          font-size: 24px;
          color: rgba(0, 0, 0, 0.2);
          margin-left: 16px;
          vertical-align: middle;
          cursor: pointer;
          transition: color 0.3s;
          &:hover {
            color: #1890ff;
          }
        }
      }
    }
  }
</style>
