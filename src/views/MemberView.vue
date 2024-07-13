<template>
    <section class="section">
        <div class="container">
            <div>
                <h1>會員管理</h1>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">會員名稱</th>
                            <th scope="col">會員生日</th>
                            <th scope="col">帳號</th>
                            <th scope="col">電話</th>
                            <th scope="col">地址</th>
                            <th scope="col">狀態</th>
                            <th scope="col">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="member in members" :key="member.m_no">
                            <td>{{ member.m_name }}</td>
                            <td>{{ member.m_birth }}</td>
                            <td>{{ member.m_account }}</td>
                            <td>{{ member.m_phone }}</td>
                            <td>{{ member.m_add }}</td>
                            <td :class="member.m_status == '1' ? 'normal' : 'useless'">
                                {{ member.m_status == '1' ? '正常' : '停權' }}
                            </td>
                            <td>
                                <button @click="toggleStatus(member)" :class="member.m_status === '1' ? 'useless' : 'normal'">
                                    {{ member.m_status == '1' ? '停權' : '啟用' }}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            members: []
        }
    },
    methods: {
        async fetchMembers() {
            try {
                //const response = await fetch('http://localhost/php_g4/memberd.php')
                const response = await fetch(`${import.meta.env.VITE_API_URL}/memberd.php`)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()
                if (data.code === 200 && Array.isArray(data.data.list)) {
                    this.members = data.data.list
                } else {
                    throw new Error(data.msg || 'Unexpected data format received from the server')
                }
            } catch (error) {
                console.error('獲取會員列表時發生錯誤:', error)
                alert('獲取會員列表失敗，請稍後再試。錯誤詳情：' + error.message)
            }
        },
        async toggleStatus(member) {
            try {
                const newStatus = member.m_status === '1' ? '0' : '1'
                //const response = await fetch('http://localhost/php_g4/memberd.php', 
                const response = await  fetch(`${import.meta.env.VITE_API_URL}/memberd.php`, 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        action: 'updateStatus',
                        m_no: member.m_no,
                        m_status: newStatus
                    })
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()
                if (data.code === 200) {
                    member.m_status = newStatus
                } else {
                    throw new Error(data.msg || '更新狀態失敗')
                }
            } catch (error) {
                console.error('更新會員狀態時發生錯誤:', error)
                alert('更新會員狀態失敗，請稍後再試。錯誤詳情：' + error.message)
            }
        }
    },
    mounted() {
        this.fetchMembers()
    }
}
</script>

<style lang="scss" scoped>
$fontBase: 16px;
$lineheight: 1.5;
$letterSpacing: 0.05em;
$pFont: Arial, sans-serif;
$titleFont: 'Noto Sans TC', sans-serif;
$darkGreen: #144433;
$red: #ff4444;

.section {
    font-size: $fontBase;
    line-height: $lineheight;
    letter-spacing: $letterSpacing;
    font-family: $pFont;
    cursor: default;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .container {
        width: 80%;
        padding: 30px;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 60px);
        margin-left: 20%;

        > div:first-child {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;

            h1 {
                font-size: 2.25em;
                font-family: $titleFont;
                font-weight: bold;
                margin: 0;
            }
        }

        .table-container {
            flex-grow: 1;
            overflow-y: auto;
            margin-bottom: 20px;

            table {
                width: 100%;
                background-color: #fff;
                border-collapse: separate;
                border-spacing: 0;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

                thead {
                    background-color: $darkGreen;
                    color: #fff;
                    position: sticky;
                    top: 0;
                    z-index: 1;

                    th {
                        padding: 15px;
                        text-align: left;
                        font-weight: bold;
                    }
                }

                tbody {
                    tr {
                        &:nth-child(even) {
                            background-color: #f8f8f8;
                        }

                        td {
                            padding: 13px;
                            border-bottom: 1px solid #ddd;

                            &:last-child {
                                text-align: center;
                            }

                            &.normal, &.useless {
                                font-weight: bold;
                            }

                            &.normal {
                                color: $darkGreen;
                            }

                            &.useless {
                                color: $red;
                            }

                            button.normal, button.useless {
                                color: #fff;
                                border: none;
                                padding: 5px 10px;
                                border-radius: 20px;
                                cursor: pointer;
                                transition: 0.3s;
                            }

                            button.normal {
                                background-color: $darkGreen;

                                &:hover {
                                    background-color: darken($darkGreen, 10%);
                                }
                            }

                            button.useless {
                                background-color: $red;

                                &:hover {
                                    background-color: darken($red, 10%);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>