<template>
    <section>
        <div class="maintitle">
            <h1>果籽後台</h1>
            <span>管理員 : {{ am_no }}</span>
        </div>
        <div class="sidebar-nav d-flex flex-column align-items-center">
            <div class="title">
                <router-link to="/indexsidebar/admin">
                    <div class="pic-logo">
                        <img src="../assets/image/logo.png" alt="" />
                    </div>
                </router-link>
            </div>
            <ul class="list-unstyled ps-0">
                <li
                    class="d-flex flex-column align-items-center"
                    v-for="(item, index) in navItems"
                    :key="index"
                >
                    <!-- data-bs-toggle="collapse"
                :data-bs-target="item.target" -->
                    <button
                        class="collapsed"
                        :class="{ 'active-button': activeIndex === index }"
                        :aria-expanded="activeIndex === index"
                        @click.stop="toggle(index)"
                    >
                        {{ item.title }}
                    </button>
                    <div
                        class="collapse"
                        :id="item.collapseId"
                        :class="{ show: activeIndex === index }"
                    >
                        <ul class="d-flex flex-column align-items-center">
                            <li v-for="(link, idx) in item.links" :key="idx">
                                <router-link
                                    :to="link.route"
                                    :class="{
                                        active: activeLinkIndex === idx
                                    }"
                                    @click.stop="setActive(index, idx)"
                                    >{{ link.text }}</router-link
                                >
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            <div class="logout d-flex flex-column align-items-center">
                <router-link class="btn-logout" to="/">登出</router-link>
            </div>
        </div>
        <div class="router-page">
            <router-view></router-view>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            am_no: '001',
            activeIndex: null,
            activeLinkIndex: null,
            navItems: [
                {
                    title: '首頁管理',
                    target: '#home-collapse',
                    collapseId: 'home-collapse',
                    links: [
                        { route: '/indexsidebar/farm', text: '農場' },
                        { route: '/indexsidebar/news', text: '最新消息' },
                        { route: '/indexsidebar/chatbox', text: '客服機器人' }
                    ]
                },
                {
                    title: '會員管理',
                    target: '#member-collapse',
                    collapseId: 'member-collapse',
                    links: [
                        { route: '/indexsidebar/member', text: '會員' }
                        // { route: '/coupons', text: '會員擁有優惠卷' },
                        // { route: '/favorites', text: '會員收藏商品' }
                    ]
                },
                {
                    title: '商品管理',
                    target: '#product-collapse',
                    collapseId: 'product-collapse',
                    links: [
                        { route: '/indexsidebar/product', text: '商品' },
                        // { route: '/categories', text: '商品分類' },
                        { route: '/indexsidebar/porders', text: '商品訂單' }
                        // { route: '/details', text: '商品明細' }
                    ]
                },
                {
                    title: '活動管理',
                    target: '#activity-collapse',
                    collapseId: 'activity-collapse',
                    links: [
                        { route: '/indexsidebar/activity', text: '活動' },
                        // { route: '/activity-categories', text: '活動分類' },
                        { route: '/indexsidebar/aorders', text: '活動訂單' }
                    ]
                },
                {
                    title: '遊戲管理',
                    target: '#game-collapse',
                    collapseId: 'game-collapse',
                    links: [{ route: '/indexsidebar/game', text: '食農問答' }]
                },
                {
                    title: '後台管理',
                    target: '#back-collapse',
                    collapseId: 'back-collapse',
                    links: [
                        { route: '/indexsidebar/admin', text: '管理員' },
                        { route: '/indexsidebar/coupon', text: '優惠卷' }
                    ]
                }
            ]
        }
    },
    methods: {
        toggle(index) {
            // 切换 activeIndex，确保可以展开和收起
            if (this.activeIndex === index) {
                this.activeIndex = null
            } else {
                this.activeIndex = index
            }
        },
        setActive(parentIndex, linkIndex) {
            // 设置或取消子链接的活动状态
            if (this.activeIndex === parentIndex && this.activeLinkIndex === linkIndex) {
                // this.activeLinkIndex = null // 如果点击当前活跃链接，则取消 active 状态
            } else {
                this.activeIndex = parentIndex
                this.activeLinkIndex = linkIndex // 设置被点击链接的索引为 active
            }
        }
    }
}
</script>

<style lang="scss" scoped>
section {
    font-size: $fontBase;
    line-height: $lineheight;
    letter-spacing: $letterSpacing;
    font-family: $pFont;
    cursor: default;
    width: 100%;
    .maintitle {
        background-color: $darkGreen;
        padding: 10px 0;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        h1 {
            color: #fff;
            font-family: $titleFont;
            font-weight: bold;
            font-size: 2.5em;
        }
        span {
            color: #fff;
        }
    }
    .sidebar-nav {
        width: 20%;
        background-color: $darkGreen;
        box-shadow: 0 0 6px hsla(0, 0%, 0%, 0.4);
        // padding-left: 50px;
        padding-top: 10px;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        .title {
            width: 60%;
            margin: 10px 0;
            // text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-bottom: solid 1px #d9d9d9;

            a {
                font-size: 2.25em;
                color: #fff;
                padding-bottom: 10px;
                text-decoration: none;
                display: block;
                .pic-logo {
                    width: 70px;
                    img {
                        width: 100%;
                    }
                }
            }
        }
        .list-unstyled {
            li {
                margin-bottom: 12px;
                button {
                    border: none;
                    border-radius: 20px;
                    background-color: $darkGreen;
                    color: #fff;
                    font-size: 1.25em;
                    padding: 6px 30px;
                    margin-bottom: 5px;
                    transition: 0.5s;
                    &:hover {
                        background-color: $lightGreen;
                        border-radius: 20px;
                    }
                }
                div {
                    ul {
                        // background-color: $lightGreen;
                        // border-radius: 5px;
                        // padding: 10px;
                        padding-left: 5px;
                        li {
                            margin-bottom: 7px;
                            a {
                                text-decoration: none;
                                color: #fff;
                                padding-bottom: 1px;
                                border-bottom: solid 1px transparent;
                                transition: 0.5s;
                                &:hover {
                                    color: #e76900;
                                }
                            }
                            .router-link-exact-active {
                                color: #e76900;
                            }
                            // .active {
                            //     color: #e76900;
                            // }
                        }
                    }
                }
            }
        }
        .logout {
            width: 60%;
            padding-top: 20px;
            border-top: solid 1px #d9d9d9;
            .btn-logout {
                color: #fff;
                text-decoration: none;
                background-color: #e76900;
                border: none;
                padding: 6px 30px;
                border-radius: 20px;
                transition: 0.5s;
                &:hover {
                    background-color: $red;
                }
                a {
                    text-decoration: none;
                    color: #fff;
                }
            }
        }
    }
    .router-page {
        width: 100%;
    }
}
</style>
