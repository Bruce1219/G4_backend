<template>
    <section class="section">
        <div class="container">
            <div>
                <h1>商品訂單管理</h1>
            </div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">訂單編號</th>
                        <th scope="col">會員編號</th>
                        <th scope="col">訂購人</th>
                        <th scope="col">訂單日期</th>
                        <th scope="col">金額</th>
                        <th scope="col">訂單狀態</th>
                        <th scope="col">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in p_orders" :key="order.po_no">
                        <td>{{ order.po_no }}</td>
                        <td>{{ order.m_no }}</td>
                        <td>{{ order.po_name }}</td>
                        <td>{{ order.po_time }}</td>
                        <td>NT$ {{ order.po_total }}</td>
                        <td>
                            <select v-model="order.po_status" @change="updateOrderStatus(order)">
                                <option value="0">待配送</option>
                                <option value="1">配送中</option>
                                <option value="2">配送完成</option>
                                <option value="3">待審核</option>
                                <option value="4">已註銷</option>
                            </select>
                        </td>
                        <td>
                            <button class="edit" @click="viewOrder(order.po_no)">查看</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Lightbox -->
        <div v-if="showLightbox" class="lightbox-overlay">
            <div class="lightbox-content">
                <h2>訂單詳情</h2>
                <p><strong>訂單編號:</strong> {{ selectedOrder.po_no }}</p>
                <p><strong>會員姓名:</strong> {{ selectedOrder.po_name }}</p>
                <p><strong>訂單日期:</strong> {{ selectedOrder.po_time }}</p>
                <p><strong>訂單狀態:</strong> {{ getStatusText(selectedOrder.po_status) }}</p>

                <h3>訂單商品</h3>
                <table>
                    <thead>
                        <tr>
                            <th>商品編號</th>
                            <th>名稱</th>
                            <th>數量</th>
                            <th>單價</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in selectedOrder.items" :key="item.p_no">
                            <td>{{ item.p_no }}</td>
                            <td>{{ item.p_name }}</td>
                            <td>{{ item.o_quatity }}</td>
                            <td>NT$ {{ item.p_fee }}</td>
                        </tr>
                    </tbody>
                </table>

                <h3>訂單金額明細</h3>
                <p><strong>總價:</strong> NT$ {{ selectedOrder.po_total }}</p>
                <p><strong>折價券折抵:</strong> NT$ {{ selectedOrder.po_discount }}</p>
                <p><strong>運費:</strong> NT$ 60</p>
                <p><strong>實付金額:</strong> NT$ {{ selectedOrder.po_finalprice }}</p>

                <div class="button-group">
                    <button v-if="selectedOrder.po_status == 0" @click="cancelOrder" class="cancel-button">註銷訂單</button>
                    <button @click="closeLightbox" class="close-button">關閉</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            p_orders: [],
            showLightbox: false,
            selectedOrder: null,
        };
    },
    methods: {
        fetchOrders() {
            console.log('Fetching orders...');
            fetch('http://localhost/php_g4/back_productOrders.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'fetch_orders' })
            })
                .then((res) => {
                    console.log('Response received:', res);
                    return res.json();
                })
                .then((json) => {
                    console.log('Parsed JSON:', json);
                    if (json.code == 200) {
                        this.p_orders = json.data;
                        console.log('Orders fetched:', this.p_orders);
                    } else {
                        throw new Error('獲取訂單失敗: ' + json.msg);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching orders:', error);
                    alert('獲取訂單時發生錯誤: ' + error.message);
                });
        },

        viewOrder(po_no) {
            console.log('Viewing order:', po_no);
            fetch('http://localhost/php_g4/back_productOrders.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'view_order', po_no: po_no })
            })
                .then((res) => res.json())
                .then((json) => {
                    console.log('Parsed JSON:', json);
                    if (json.code === 200) {
                        this.selectedOrder = json.data;
                        this.showLightbox = true;
                        console.log('Lightbox should show now. showLightbox:', this.showLightbox);
                    } else {
                        throw new Error('獲取訂單詳情失敗: ' + json.msg);
                    }
                })
                .catch((error) => {
                    console.error('Error viewing order:', error);
                    alert('獲取訂單詳情時發生錯誤: ' + error.message);
                });
        },

        cancelOrder() {
    if (this.selectedOrder.po_status !== 0 && this.selectedOrder.po_status !== 3) {
        alert('只有待配送或待審核的訂單才可以註銷。');
        return;
    }
    
    if (confirm('確定要註銷訂單嗎？')) {
        console.log('Cancelling order:', this.selectedOrder.po_no);
        fetch('http://localhost/php_g4/back_productOrders.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'cancel_order', po_no: this.selectedOrder.po_no })
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code === 200) {
                    alert(json.msg);
                    this.selectedOrder.po_status = 4; // 更新状态为已注销
                    this.closeLightbox();
                    this.fetchOrders();
                } else {
                    throw new Error('註銷訂單錯誤: ' + json.msg);
                }
            })
            .catch((error) => {
                console.error('Error cancelling order:', error);
                alert('註銷訂單發生錯誤: ' + error.message);
            });
    }
},
        closeLightbox() {
            this.showLightbox = false;
            this.selectedOrder = null;
        },

        updateOrderStatus(order) {
            console.log('Updating order status:', order.po_no, order.po_status);
            fetch('http://localhost/php_g4/back_productOrders.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'update_order_status',
                    po_no: order.po_no,
                    po_status: order.po_status
                })
            })
                .then((res) => {
                    console.log('Response received:', res);
                    return res.json();
                })
                .then((json) => {
                    console.log('Parsed JSON:', json);
                    if (json.code === 200) {
                        alert('訂單狀態更新成功');
                    } else {
                        throw new Error('更新訂單狀態失敗: ' + json.msg);
                    }
                })
                .catch((error) => {
                    console.error('Error updating order status:', error);
                    alert('更新訂單狀態時發生錯誤: ' + error.message);
                });
        },

        getStatusText(status) {
            const statusMap = {
                0: '待配送',
                1: '配送中',
                2: '配送完成',
                3: '待審核',
                4:'已註銷'    
            };
            return statusMap[status] || '未知狀態';
        }
    },
    mounted() {
        this.fetchOrders();
    }
}
</script>

<style lang="scss" scoped>
.section {
    font-size: $fontBase;
    line-height: $lineheight;
    letter-spacing: $letterSpacing;
    font-family: $pFont;
    cursor: default;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;

    .container {
        width: 80%;
        padding: 30px;
        margin: 0;

        div {
            display: flex;
            justify-content: space-between;

            h1 {
                font-size: 2.25em;
                font-family: $titleFont;
                font-weight: bold;
            }

            button {
                color: #fff;
                text-decoration: none;
                background-color: $darkGreen;
                border: solid 1px transparent;
                padding: 7px 15px;
                margin: 5px 0;
                border-radius: 10px;
                transition: 0.5s;
                box-sizing: border-box;

                &:hover {
                    background-color: #fff;
                    border: solid 1px $darkGreen;
                    color: $darkGreen;
                }
            }
        }

        table {
            width: 100%;
            margin-top: 30px;
            background-color: #fff;
            border-collapse: separate;
            border-spacing: 0;

            thead {
                line-height: 3;
                text-align: center;
                font-weight: bold;
                border-collapse: separate;
                border-radius: 20px;
            }

            tr {
                border-collapse: separate;
                border-radius: 20px;
            }

            th {
                color: #144433;
                font-size: 16px;
                padding: 10px;
                border: solid 1px $darkGreen;
            }

            td {
                font-size: 16px;
                margin: 0 3px;
                line-height: 3;
                text-align: center;
                border: solid 1px $darkGreen;
            }

            tr:first-child th:first-child {
                border-top-left-radius: 20px;
            }

            tr:last-child td:first-child {
                border-bottom-left-radius: 20px;
            }

            tr:first-child th:last-child {
                border-top-right-radius: 20px;
            }

            tr:last-child td:last-child {
                border-bottom-right-radius: 20px;
            }

            td:last-child {
                line-height: 1;
            }

            .edit {
                color: #fff;
                text-decoration: none;
                background-color: $darkGreen;
                border: none;
                padding: 7px 20px;
                margin: 5px 0;
                border-radius: 20px;
                transition: 0.5s;

                &:hover {
                    background-color: $red;
                }
            }
        }
    }
}

.lightbox-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000000;
}

.lightbox-content {
    background-color: white;
    padding: 30px;
    border-radius: 15px;
    max-width: 80%;
    max-height: 80%;
    overflow-y: auto;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    z-index: 1000001;

    h2 {
        font-size: 24px;
        color: #333;
        margin-bottom: 20px;
        border-bottom: 2px solid #eee;
        padding-bottom: 10px;
    }

    h3 {
        font-size: 20px;
        color: #444;
        margin-top: 20px;
        margin-bottom: 15px;
    }

    p {
        margin-bottom: 10px;
        line-height: 1.5;

        strong {
            color: #555;
        }
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;

        th,
        td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
            font-weight: bold;
            color: #333;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
    }

    .button-group {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
    }

    .cancel-button,
    .close-button {
        padding: 10px 20px;
        margin-left: 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s, transform 0.1s;

        &:hover {
            transform: translateY(-2px);
        }

        &:active {
            transform: translateY(1px);
        }
    }

    .cancel-button {
        background-color: #ff4d4d;
        color: white;

        &:hover {
            background-color: #ff3333;
        }
    }

    .close-button {
        background-color: #4CAF50;
        color: white;

        &:hover {
            background-color: #45a049;
        }
    }

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
}
</style>
