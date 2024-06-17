<template>
    <section>
        <!-- <div class="title">
            <h1>果籽後台</h1>
        </div> -->
        <div class="sidebar-nav d-flex flex-column align-items-center">
            <div class="title">
                <router-link to="/">果籽後台</router-link>
            </div>
            <ul class="list-unstyled ps-0">
                <li
                    class="d-flex flex-column align-items-center"
                    v-for="(item, index) in navItems"
                    :key="index"
                >
                    <button
                        class="collapsed"
                        :class="{ 'active-button': activeIndex === index }"
                        data-bs-toggle="collapse"
                        :data-bs-target="item.target"
                        aria-expanded="false"
                        @click="toggle(index)"
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
                                <router-link :to="link.route">{{ link.text }}</router-link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            <div class="logout d-flex flex-column align-items-center">
                <button class="btn-logout">登出</button>
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
            activeIndex: null,
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
            this.activeIndex = this.activeIndex === index ? null : index
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
    width: 100%;
    .sidebar-nav {
        width: 20%;
        background-color: $darkGreen;
        // padding-left: 50px;
        padding-top: 10px;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        .title {
            width: 70%;
            margin: 15px 0;
            text-align: center;
            a {
                font-size: 2.25em;
                color: #fff;
                padding-bottom: 20px;
                border-bottom: solid 1px #d9d9d9;
                text-decoration: none;
                display: block;
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
                background-color: #e76900;
                border: none;
                padding: 6px 30px;
                color: #fff;
                border-radius: 20px;
                transition: 0.5s;
                &:hover {
                    background-color: $red;
                }
            }
        }
    }
}
</style>
