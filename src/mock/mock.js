import Mock from 'mockjs'

Mock.mock('http://localhost:8001/login', {
    'token': '1234567890'
})

Mock.mock('http://localhost:8080/user', {
    'name': '@name',
    'email': '@email',
    'age|1-10': 5,
})

Mock.mock('http://localhost:8080/menu', {
    'id': '@increment',
    'name': 'menu',
    'order|1-20': 5,
})