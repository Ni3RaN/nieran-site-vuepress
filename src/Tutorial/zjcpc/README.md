---
title: The 19th Zhejiang Provincial Collegiate Programming Contest
---

## G. Easy Glide

经过给定的点时速度从v1变成v2，维持3s变回v1，把起点，终点和给定点连起来，就是一个最短路问题，朴素迪杰斯特拉或者堆优化都可以。

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef long double ld;
const int N = 1e3 + 5;
const ll INF = 1e18;
int n;
ld v1,v2;
ld a[N][2];
ld dis[N];
ld v[N][N];
int vis[N];

ld get_dis(ld x1,ld y1,ld x2,ld y2) {
    ld dist = sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
    if(x1==a[0][0] && y1==a[0][1]) {
        return dist/v1;
    }
    if(x2==a[0][0] && y2==a[0][1]) {
        return dist/v1;
    }
    if(3-dist/v2 > 1e-6) {
        return dist/v2;
    }
    return (dist-3*v2)/v1 + 3;
}

void solve() {
    scanf("%d",&n);
    for(int i=1;i<=n;i++) {
        scanf("%Lf %Lf",&a[i][0],&a[i][1]);
    }
    scanf("%Lf %Lf %Lf %Lf",&a[0][0],&a[0][1],&a[n+1][0],&a[n+1][1]);
    scanf("%Lf %Lf",&v1,&v2);
    for(int i=0;i<=n+1;i++) {
        for(int j=0;j<i;j++) {
            v[i][j] = v[j][i] = get_dis(a[i][0],a[i][1],a[j][0],a[j][1]);
        }
    }
    for(int i=0;i<=n+1;i++) {
        dis[i] = INF;
    }
    dis[0]=0;
    for(int i=0;i<=n+1;i++) {
        ld dis_w = INF;
        int id=0;
        for(int j=0;j<=n+1;j++) {
            if(!vis[j] && dis[j] < dis_w) {
                dis_w = dis[j];
                id = j;
            }
        }
        vis[id] = 1;
        for(int j=0;j<=n+1;j++) {
            dis[j] = min(dis[j],dis[id]+v[id][j]);
        }
    }
    printf("%.10Lf\n",dis[n+1]);
}
int main() {
    #ifndef ONLINE_JUDGE
        freopen("input.in","r",stdin);
        // freopen("output.out","w",stdout);
    #endif
    int _=1;
    // scanf("%d",&_);
    while(_--) {
        solve();
    }
    return 0;
}
```

## M. BpbBppbpBB

统计形如

```
######
##..##
#....#
#....#
##..##
######
```
的数量即可，也可以比较两个之间的距离判断（我比赛时这么写的...）

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
const int N = 1e3 + 5;
int n,m;
char s[N][N];
bool check(int x,int y) {
    if(x+3>n||y-1<=0||y+2>=m) {
        return false;
    }
    if(s[x][y-1]=='.'||s[x][y]=='#'||s[x][y+1]=='#'||s[x][y+2]=='.'||
        s[x+1][y-1]=='#'||s[x+1][y]=='#'||s[x+1][y+1]=='#'||s[x+1][y+2]=='#'||
        s[x+2][y-1]=='#'||s[x+2][y]=='#'||s[x+2][y+1]=='#'||s[x+2][y+2]=='#'||
        s[x+3][y-1]=='.'||s[x+3][y]=='#'||s[x+3][y+1]=='#'||s[x+3][y+2]=='.') {

        return false;
    }
    if(x-1<0||s[x-1][y]=='.') return false;
    return true;
}
void solve() {
    scanf("%d %d",&n,&m);
    for(int i=1;i<=n;i++) {
        scanf("%s",s[i]+1);
    }
    int sumb = 0;
    int sumw = 0;
    for(int i=1;i<=n;i++) {
        for(int j=1;j<=m;j++) {
            if(s[i][j]=='#') {
                sumb++;
            }
            if(check(i,j)) {
                sumw++;
            }
        }
    }
    int x = (100*sumw - sumb)/(200 - 146);
    int y = sumw - 2*x;
    printf("%d %d\n",x,y);
}
int main() {
    #ifndef ONLINE_JUDGE
        freopen("input.in","r",stdin);
        // freopen("output.out","w",stdout);
    #endif
    int _=1;
    // scanf("%d",&_);
    while(_--) {
        solve();
    }
    return 0;
}
/**
 * 146 2
 * 100 1
 * 146x + 100y = sumb
 * 200x + 100y = 100*sumw
*/
```

## I. Barbecue

操作的时候如果不是回文字符串，并且长度大于2，那么总是可以操作使字符串不变成回文串

所以只需要判断字符串是不是回文，如果不是判断字符串的长度的奇偶。

判断子字符串是否是回文，可以用hash，也可以用Manacher(我比赛时用了这个，用起来比hash烦)

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
const int N = 1e6 + 5;
const ll mod = 1e9 + 7;
const int P = 1331;
int n,m;
char s[N];
ll h1[N],h2[N],p[N];
bool check(int l,int r) {
    int len = r - l + 1;
    ll x = (h1[r] - h1[l - 1] * p[len] % mod + mod) % mod;
    ll y = (h2[n - l + 1] - h2[n - r] * p[len] % mod + mod) % mod;
    // cout<<l<<" "<<r<<" "<<x<<" "<<y<<endl;
    return x == y;
}
void solve() {
    scanf("%d %d",&n,&m);
    scanf("%s",s+1);
    p[0] = 1;
    for(int i=1;i<=n;i++) {
        p[i] = p[i-1] * P % mod;
        h1[i] = (h1[i-1] * P + s[i]) % mod;
        h2[i] = (h2[i-1] * P + s[n-i+1]) % mod;
    }
    while(m--) {
        int l,r;
        scanf("%d %d",&l,&r);
        if(check(l,r)) {
            puts("Budada");
        }
        else {
            if((r-l+1) % 2 == 0) {
                puts("Budada");
            }
            else {
                puts("Putata");
            }
        }
    }
}
int main() {
    #ifndef ONLINE_JUDGE
        freopen("input.in","r",stdin);
        freopen("output.out","w+",stdout);
    #endif
    int _=1;
    // scanf("%d",&_);
    while(_--) {
        solve();
    }
    return 0;
}
/**
 * abab
 *
*/
```

## J. Frog

看图

### 圆心角90度

![img3.png](./images/img3.png)

### 圆心角约等于131度

![img2.png](./images/img2.png)

### 可得出结论：
设圆心角为θ，
 - θ=0，最少0步，
 - θ≤90，最少2步，如图所示：
![img1.png](./images/img4.png)
 - 90<θ≤131，最少3步，如图所示：
![img4.png](./images/img1.png)
 - 131<θ≤180，最少4步，如图所示：
![img5.png](./images/img5.png)
 - θ>180，与(360-θ)的步数相同，走法相反。
```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
const int N = 1e5 + 5;
const double PI = acos(-1.0);
struct point {
    double x,y;
    point(double _x,double _y):x(_x),y(_y) {}
};
int n;
int a,b;
point get_point(int x) {
    return point(cos((x*PI)/180), sin((x*PI)/180));
}
double get_dis(point x,point y) {
    return sqrt((x.x - y.x) * (x.x - y.x) + (x.y - y.y) * (x.y - y.y));
}
void solve() {
    bool flag=false;
    vector<point> res;
    scanf("%d %d",&a,&b);
    int dif=(b-a+360)%360;
    if(dif>180) {
        swap(a,b);
        dif=360 - dif;
        flag=true;
    }
    point ta = get_point(a);
    point tb = get_point(b);
    if(dif==0) {
        res.push_back(ta);
    }
    else if(dif<=90) {
        res.push_back(ta);
        res.push_back(point(ta.x+tb.x, ta.y+tb.y));
        res.push_back(tb);
    }
    else if(dif<=131) {
        res.push_back(ta);
        point tmp = get_point(a+90);
        tmp = point(ta.x+tmp.x,ta.y+tmp.y);
        double dis1 = get_dis(ta, tb);
        double dis2 = get_dis(tmp, tb);
        double cos1 = (dis2*dis2 + 1 - dis1*dis1) / (2*dis2);
        double cos2 = (dis2*dis2 + 1 - 1) / (2*dis2);
        double ans = atan2(tb.y-tmp.y,tb.x-tmp.x) -acos(cos2);
        res.push_back(tmp);
        res.push_back(point(tmp.x+cos(ans), tmp.y+sin(ans)));
        res.push_back(tb);
    }
    else {
        res.push_back(ta);
        point tmp = get_point(a+90);
        res.push_back(point(ta.x+tmp.x, ta.y+tmp.y));
        tmp = get_point(a+90);
        res.push_back(tmp);
        res.push_back(point(tmp.x+tb.x, tmp.y+tb.y));
        res.push_back(tb);
    }
    if(flag) reverse(res.begin(), res.end());
    int step = res.size();
    printf("%d\n",step-1);
    for(int i=0;i<step;i++) {
        if(i>0) {
            double tmp = get_dis(res[i], res[i-1]);
            // printf("%lf\n",tmp);
        }
        printf("%.10f %.10f\n", res[i].x, res[i].y);
        double r = sqrt(res[i].x*res[i].x+res[i].y*res[i].y);
        // if(1-r>1e-6) {
        //     printf("error %lf\n",r);
        // }
    }
    // cout<<"-------"<<endl;
}
int main() {
    #ifndef ONLINE_JUDGE
        freopen("input.in","r",stdin);
        freopen("output.out","w+",stdout);
    #endif
    int _=1;
    scanf("%d",&_);
    while(_--) {
        solve();
    }
    return 0;
}
```
