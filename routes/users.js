var express = require('express');
var {
  find,
  insert,
  del,
  update
} = require("../libs/mongod.js");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//反显管理员信息
router.get('/cadmin', function (req, res, next) {
  let { accountId } = req.query
  let data = {
    accountName: 'xiaoluo',
    roleId: 'a',
    fullName: '罗罗罗',
    idNo: '440183199809189545',
    affiliatedCompany: '龙虎科技有限公司',
    certificateConfig: '否',
    phoneNumber: '13412666745',
    assetChannelAuthority: ['ALL'],
    status: '启用'
  }
  if (accountId == "LPDQ120120000000001") {
    res.send(data);
  } else if (accountId == "LPDQ120120000000002") {
    res.send({ ...data, fullName: '张三疯', accountName: 'zhangsanfeng' });
  } else {
    res.send({ ...data, affiliatedCompany: '威武科技有限公司', accountName: 'weiwu' });
  }

});

//管理员设置列表
router.get('/administrator', async (req, res, next) => {
  let { page } = req.query
  console.log(page)
  let data = await find("administrator")
  if (data) {
    res.send(data);
  }
});

//管理员设置列表表单筛选列表
router.post('/modeladministrator', async (req, res, next) => {
  let { fullName } = req.body
  // console.dir(fullName)
  if (fullName) {
    let data = await find("modeladministrator")
    res.send(data);
  } else {
    let data = await find('administrator')
    res.send(data);
  }
  // if (data) {
  //   res.send(data);
  // }
});


//管理员设置列表点击禁用启用按钮
router.post('/buttonadministrator', async (req, res, next) => {
  // console.dir(req.body)
  let data = await find('buttonadministrator')
  if (data) {
    res.send(data);
  }
});

//管理员设置列表点击删除按钮
router.post('/deleteadministrator', async (req, res, next) => {
  // console.dir(req.body)
  let data = await find('deleteadministrator')
  if (data) {
    res.send(data);
  }
});


//新增管理员
router.post('/addadmin', async (req, res, next) => {
  let data = {
    code: 200,
    msg: "新增管理员成功！",
  }
  // console.log(req.body);
  // let data = await find("addadmin")
  if (data) {
    res.send({
      code: 200,
      msg: "新增管理员成功！",
    });
  }
});

//修改管理员
router.post('/changeadmin', async (req, res, next) => {
  let data = {
    code: 200,
    msg: "修改管理员成功！",
  }
  // console.log(req.body);
  // let data = await find("addadmin")
  if (data) {
    res.send({
      code: 200,
      msg: "修改管理员成功！",
    });
  }
});

//角色管理列表
router.get('/role', function (req, res, next) {
  let data = {
    code: 200,
    msg: "SUCCESS.",
    data: {
      total: 2,
      rows: [
        {
          name: 'Tony',
          roleName: '管理员角色',
          description: '无',
          channel: '渠道a',
          model: 'A',
          status: '禁用',
          createTime: '2018-10-23'
        },
        {
          name: 'Judy',
          roleName: '管理员角色',
          description: '无',
          channel: '渠道a',
          model: 'A',
          status: '启用',
          createTime: '2018-10-23'
        }
      ]
    }
  }
  res.send(data)
});
//角色管理列表筛选
router.post('/queryrole', async (req, res, next) => {
  console.dir(req.body)
  let data = {
    code: 200,
    msg: "SUCCESS.",
    data: {
      total: 1,
      rows: [
        {
          name: 'Judy',
          roleName: '管理员角色',
          description: '无',
          channel: '渠道a',
          model: 'A',
          status: '启用',
          createTime: '2018-10-23'
        }
      ]
    }
  }
  res.send(data)
})

//角色管理禁用启用按钮
router.get('/buttonrole', async (req, res, next) => {
  let data = {
    code: 200,
    msg: "SUCCESS.",
    data: {
      total: 2,
      rows: [
        {
          name: 'Tony',
          roleName: '管理员角色',
          description: '无',
          channel: '渠道a',
          model: 'A',
          status: '启用',
          createTime: '2018-10-23'
        },
        {
          name: 'Judy',
          roleName: '管理员角色',
          description: '无',
          channel: '渠道a',
          model: 'A',
          status: '启用',
          createTime: '2018-10-23'
        }
      ]
    }
  }
  res.send(data)
})

//角色管理编辑按钮
router.post('/updatarolelist', async (req, res, next) => {
  console.dir(req.body)
  let data = {
    code: 200,
    msg: "SUCCESS.",
    data: {
      total: 2,
      rows: [
        {
          name: 'Tony',
          roleName: '管理员角色',
          description: '无',
          channel: '渠道a',
          model: 'B',
          status: '启用',
          createTime: '2018-10-23'
        },
        {
          name: 'Judy',
          roleName: '管理员角色',
          description: '无',
          channel: '渠道a',
          model: 'A',
          status: '启用',
          createTime: '2018-10-23'
        }
      ]
    }
  }
  if (req.body) {
    res.send(data)
  }


})

//审核配置列表
router.get('/audit', async (req, res, next) => {
  let data = await find("audit")
  if (data) {
    res.send(data);
  }
});

//审核配置表单筛选
router.post('/modelaudit', async (req, res, next) => {
  // console.dir(req.body)
  let { qudao, type } = req.body
  if (qudao === 'ALL' && type === 'ALL') {
    let data = await find("audit")
    res.send(data);
  } else {
    let data = await find("modelaudit")
    res.send(data);
  }
});

//审核配置页面点击禁用启用按钮
router.post('/buttonaudit', async (req, res, next) => {
  // console.dir(req.body)
  let data = await find('buttonaudit')
  if (data) {
    res.send(data);
  }
});

//审核配置页面点击删除按钮
router.post('/delaudit', async (req, res, next) => {
  // console.dir(req.body)
  let data = await find('delaudit')
  if (data) {
    res.send(data);
  }
});

//用户管理信息
router.get('/userInfo', async (req, res, next) => {
  let { userId } = req.query;
  console.dir(userId);
  let data = {
    error_code: 0,
    data: {
      userId: "LPQD1211111988771",
      createTime: "12154545",
      userName: "吴系挂",
      affiliatedCompany: 2,
      name: "关云长",
      idNo: "421087199904094456",
      idCardFront: "/upload?file=f997776",
      idCardReverse: "/upload?file=f997776",
      loginPassword: "2344444",
      transactionPin: "222111",
      signCertificate: "已开通"
    }
  };
  if (data) {
    res.send(data);
  }
});

//修改账号登录密码和交易密码
router.post('/cloginpassword', function (req, res, next) {
  let oldpassword = "123456qwe";
  let trapassword = "12345qwe";
  let { oldPassWord, newPassword } = req.body;
  if (!(oldPassWord === oldpassword)) {
    res.send({
      code: 500,
      msg: '旧密码不正确'
    })
  } else if (newPassword === oldpassword) {
    res.send({
      code: 500,
      msg: '新密码不能与登录密码一致'
    })
  } else if (newPassword === trapassword) {
    res.send({
      code: 500,
      msg: '新密码不能与交易密码一致'
    })
  } else {
    res.send({
      code: 200,
      msg: '修改成功'
    })
  }
  console.dir(req.body)
});

//忘记交易密码
router.post('/ctrapassword', function (req, res, next) {
  let vitcode = '123456';
  let phone = '13414111654';
  let uname = 'aaa';
  let { verificationCode, phoneNumber, userName } = req.body;
  if (!(verificationCode === vitcode)) {
    res.send({
      code: 500,
      msg: '验证码错误',
    })
  } else if (!(phone === phoneNumber)) {
    res.send({
      code: 500,
      msg: '该手机号与该用户名不匹配'
    })
  } else {
    res.send({
      code: 200,
      msg: '验证成功'
    })
  }
});

//重置交易密码
router.post('/rtrapassword', function (req, res, next) {
  let { userName } = req.body;
  console.dir(req.body)
  if (userName) {
    res.send({
      code: 200,
      msg: '重置成功'
    })
  }
});


module.exports = router;
