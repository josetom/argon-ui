<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <img alt="logo" class="logo" src="@/assets/logo.png" />
          <span class="title">Sign Up&nbsp;</span>
        </div>
        <div class="desc">Sign up with Argon</div>
      </div>
      <div class="register">
        <a-form
          :form="form"
          @submit="handleSubmit"
        >
          <a-form-item
            v-bind="formItemLayout"
            label="Name"
          >
            <a-row :gutter="8">
              <a-col :span="12">
                <a-input
                  v-decorator="[
                    'firstName',
                    {
                      rules: [{ required: true, message: 'Please input your first name!', whitespace: true }]
                    }
                  ]"
                />
              </a-col>
              <a-col :span="12">
                <a-input
                  v-decorator="[
                    'lastName',
                    {
                      rules: [{ required: true, message: 'Please input your last name!', whitespace: true }]
                    }
                  ]"
                />
              </a-col>
            </a-row>
          </a-form-item>
              <a-form-item
            v-bind="formItemLayout"
            label="Phone Number"
          >
            <a-input
              v-decorator="[
                'phone',
                {
                  rules: [{ required: true, message: 'Please input your phone number!' }],
                }
              ]"
              style="width: 100%"
            >
              <a-select
                slot="addonBefore"
                v-decorator="[
                  'phoneCountryCode',
                  { initialValue: '91' }
                ]"
                style="width: 70px"
              >
                <a-select-option value="91">
                  +91
                </a-select-option>
                <a-select-option value="1">
                  +1
                </a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
          <a-form-item
            v-bind="formItemLayout"
            label="E-mail"
          >
            <a-input
              v-decorator="[
                'email',
                {
                  rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                  }, {
                    required: true, message: 'Please input your E-mail!',
                  }]
                }
              ]"
            />
          </a-form-item>
          <a-form-item
            v-bind="formItemLayout"
            label="Password"
          >
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [{
                    required: true, message: 'Please input your password!',
                  }, {
                    validator: validateToNextPassword,
                  }],
                }
              ]"
              type="password"
            />
          </a-form-item>
          <a-form-item
            v-bind="formItemLayout"
            label="Confirm Password"
          >
            <a-input
              v-decorator="[
                'confirmPassword',
                {
                  rules: [{
                    required: true, message: 'Please confirm your password!',
                  }, {
                    validator: compareToFirstPassword,
                  }],
                }
              ]"
              type="password"
              @blur="handleConfirmBlur"
            />
          </a-form-item>
          <a-form-item
            v-bind="formItemLayout"
          >
            <a-checkbox
              v-decorator="['consent', {valuePropName: 'checked'}]"
            >
              I accept the <a href=""> Terms and Conditions </a>
            </a-checkbox>
          </a-form-item>
          <a-form-item v-bind="tailFormItemLayout">
            <a-button
              :loading="isRegisterProcessing"
              type="primary"
              html-type="submit"
            >
              Register
            </a-button>
          </a-form-item>
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
  name: 'Register'
})
export default class Register extends Vue {
  form: any
  confirmDirty: boolean
  isRegisterProcessing:boolean = false
  formItemLayout: any = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  }
  tailFormItemLayout: any = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  }

  beforeCreate () {
    this.form = this.$form.createForm(this)
  }

  handleSubmit (e: Event) {
    e.preventDefault()
    this.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        this.isRegisterProcessing = true
        new RestClient().post('/signup', values)
          .then((res:any) => {
            const user = res.data.user
            this.$store.commit('user/setUser', user)
            this.isRegisterProcessing = false
            // this.$router.push('/dashboard/workplace')
            this.$message.error('Success !')
          }, (err: any) => {
            this.$message.error((err.response && err.response.data) || 'Sorry, Something went wrong !')
            this.isRegisterProcessing = false
          })
      }
    })
  }

  handleConfirmBlur (e: any) {
    const value = e.target.value
    this.confirmDirty = this.confirmDirty || !!value
  }

  compareToFirstPassword (rule: any, value: any, callback: Function) {
    const form = this.form
    if (value && value !== form.getFieldValue('password')) {
      callback(new Error('Passwords don\'t match!'))
    } else {
      callback()
    }
  }

  validateToNextPassword (rule: any, value: any, callback: Function) {
    const form = this.form
    if (value && this.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
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
      .register{
        width: 450px;
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
