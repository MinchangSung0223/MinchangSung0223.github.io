---
sort: 1
---

# Lie Groups 1: Introduction and Examples
*Lie groups*은 노르웨이 수학자 Sopus Lie가 이름지은 *group*의 special case이다. 나아가 일반적인 로봇 책에서 다루는 Lie group*은 역행렬을 갖는 정방행렬들을 element로 하는 *matrix Lie $groups*를 다룬다. 

matrix Lie groups은 vector spaces외의 수학적 구조에서 "the most like $\mathbb{R}^{n}$"라고 한다. 실제로 $\mathbb{R}^{n}$은 $+$ 연산과 함께 Lie Groups의 예시로 볼 수 있다. 좀 더 일반화 하여 보면 어떤 Lie Group상의 점 $G$와 $\mathbb{R}^n$상의 어떤 점은 locally indistinguishable하며, globally하게는 $G$는 orientable이다. 점 근처만 본다고 하면 $\mathbb{R}^{n}$과 유사하지만 globally하게 본다면 $\mathbb{R}^{n}$과 달리 방향을 갖는다. 

일반적으로 matrix Lie Groups에서는 연산자를 사용하지 않는다. 왜냐면 연산자가 행렬곱임이 명백하기 때문이다. 그러나 일반적인 Lie Groups를 다룰 때에는 항상 연산에 대한 논의가 필요하다. 따라서 연산자 $\circ$라고 정의하여 사용한다. $\circ$ 연산은 $g_1, g_2 \in G$일 때 $g_1 \circ g_2 \in G$를 만족하는 연산이다. 비슷한 연산은 두 벡터간의 덧셈($+$)연산이 있다. 기억해야할 중요한 점 두가지 

 1. Lie Groups는 일반적으로 "not comutative"이다. 즉, $g_1 \circ g_2 \neq g_2 \circ g_1$을 만족해야할 필요는 없다. 
 2. group내의 원소에 scalar를 곱하여 같은 group의 원소를 생성하는 것 또한 불가능하다.

## 10.1 Introduction to Group Theroy

### 10.1.1 Binary Operation
Group은 집합(set)과 연산(operation)으로 쌍을 이룬다. 어떤 set $G$가 주어졌을때 "*(closed) binary operation*"이란 $G$의 어떤 두개의 원소가 연산에 의해서 다시 $G$로 되돌아오는 연산을 의미한다. 


```note
$b:G \times G \rightarrow G$  with  $b(g_1,g_2) \doteq g_1 \circ g_2$
```

어떤 책에서는 $b(\cdot, \cdot)$ 이런 식으로 사용하기도 하고, 다른 어떤 책에서는 $\circ$를 이용해서 나타내기도 한다. 


그럼 binary operation의 예시를 들어보자. 정방행렬 set $G = \mathbb{R}^{N \times N}$라하고 $G$의 원소 $A,B \in G$일 때,

```note
  $\circ$ = matrix multiplication
  $A \circ B = AB \in G$
```
따라서 matrix multiplication은 binary operation이다.


<!-- $$
\begin{aligned}
  & \phi(x,y) = \phi \left(\sum_{i=1}^n x_ie_i, \sum_{j=1}^n y_je_j \right)
  = \sum_{i=1}^n \sum_{j=1}^n x_i y_j \phi(e_i, e_j) = \\
  & (x_1, \ldots, x_n) \left( \begin{array}{ccc}
      \phi(e_1, e_1) & \cdots & \phi(e_1, e_n) \\
      \vdots & \ddots & \vdots \\
      \phi(e_n, e_1) & \cdots & \phi(e_n, e_n)
    \end{array} \right)
  \left( \begin{array}{c}
      y_1 \\
      \vdots \\
      y_n
    \end{array} \right)
\end{aligned}
$$
 -->
