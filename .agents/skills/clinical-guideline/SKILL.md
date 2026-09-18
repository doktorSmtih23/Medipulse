---
name: clinical-guideline
description: "Search clinical practice guidelines and expert consensus for AUTHORITATIVE recommendations: treatment standards, drug safety and dosing, and management decisions. Use whenever the answer must rest on an authoritative recommendation rather than general explanation - especially medication questions, pregnancy, pediatrics, and anything urgent. Does NOT cover lay health education; use search_knowledge for that."
---

# Clinical Guideline (临床指南)

检索临床诊疗指南与专家共识，取权威治疗标准。只搜指南层（`clinical_guideline`），
与只搜科普层的 `search_knowledge` 互不重叠。

## When to Use

- 答案必须落在权威推荐上：用药与剂量、处置决策、诊疗标准
- 高风险场景：孕产、儿童、急症、药物相互作用
- 用户明确要"指南怎么说""有什么依据"

## 何时不要用

- 只是要通俗解释"这个病是什么""平时注意什么" —— 用 `search_knowledge`
- 本地指南不足、需要检索 PubMed 文献综述 —— 用 `deep_research`

## 底层实现

Milvus 检索，`filter_type="clinical_guideline"`（语料 7661 块，占全库 75%）。
