# Loader

## 用法

1. 引入 `import Loader from '@/components/loader'`

2. 在模板中使用：
```
<Loader size="large/small" type="gray/black"></Loader>
```

## 参数
- `size` 大小
- `type` 颜色

## 说明
`large` 和 `small` 是通过 CSS 的 scale 属性实现的，所以这个加载动画的 DOM 所占大小都为 `64px`
