# Documentation Catalog Summary

**Source:** https://docs.vast.ai/image-generation
**Generated:** 2025-10-02T15:49:02.710Z
**Total Pages:** 69

## Token Usage

- **URL Filtering:** 9203 tokens
- **Master Summary:** 25968 tokens
- **Total:** NaN tokens

## Extraction Criteria

You are an AI documentation extraction assistant. Your task is to extract comprehensive documentation from the provided website.

GOALS:
1. Extract all documentation pages, guides, tutorials, and API references
2. Maintain the hierarchical structure and navigation of the documentation
3. Preserve code examples, images, and formatting
4. Create a clean, organized markdown structure

EXTRACTION RULES:
- Start from the main documentation page and follow all internal documentation links
- Ignore external links, social media, marketing pages, and non-documentation content
- Extract navigation structure to create a proper table of contents
- Preserve code blocks with proper syntax highlighting markers
- Download and reference images locally when possible
- Maintain heading hierarchy (H1-H6) accurately
- Include metadata like page titles and descriptions

OUTPUT FORMAT:
- Each page should be saved as a separate markdown file
- File names should be kebab-case and descriptive
- Create a MASTER_SUMMARY.md with an index of all pages
- Organize files in folders that mirror the site structure
- Include a README.md with information about the extraction

QUALITY CHECKS:
- Ensure all code examples are complete and properly formatted
- Verify that navigation links are preserved
- Remove unnecessary UI elements (headers, footers, ads)
- Maintain relative links between documentation pages
- Ensure all content is readable and well-formatted

Focus on creating a complete, offline-ready documentation archive that developers can easily navigate and search.


## AI URL Filtering Reasoning

Batch 1: All URLs are internal documentation pages hosted under docs.vast.ai (including anchor sections). External links (e.g., Discord invite) and non-documentation pages (e.g., cloud.vast.ai) are excluded. The anchors (e.g., #introduction) are valid internal references and are included to preserve navigation structure. This set represents the complete offline documentation corpus relevant to the site’s documentation structure.

Batch 2: Selected internal documentation pages from docs.vast.ai and vast.ai/docs, including section anchors and dedicated docs pages. Excluded external repositories, social channels, marketing pages, and non-documentation content, ensuring the results are relevant to the documentation extraction task.

---

## Comprehensive Catalog Summary

The Vast.ai documentation catalog is a comprehensive, offline-ready reference that covers both the client-facing marketplace experience and the host-side infrastructure. At its core, the collection explains how Vast.ai connects GPU providers with users who need scalable, affordable GPU compute, and it provides end-to-end guidance for getting started, operating workloads, and collaborating in teams. The docs span from high-level introductions to detailed technical procedures, making it suitable for developers, site operators, and hosts.

A central theme across the pages is the end-to-end workflow of renting GPU resources. Users begin by exploring offers through the search interface, selecting a host, GPU type, memory, and price, then creating a rental contract that yields an instance. Instances are implemented as Docker containers (with optional VM support in newer material) and are governed by fixed durations and resources (GPU, CPU, RAM, disk, I/O). Important behavioral rules include the immutability of disk sizing once an instance starts and the need to plan for storage charges even when an instance is stopped. The documentation consistently emphasizes the distinction between on-demand, reserved, and interruptible pricing and the role of end dates in contract lifecycle.

The catalog is organized to support both quick-start learners and advanced users. The QuickStart guide walks new users through account creation, key provisioning (SSH keys, TLS for Jupyter), template selection, and the lifecycle of launching, using, and destroying instances. The core “Overview” pages flesh out essential resource concepts (GPU, CPU, RAM, Disk, and Misc), clarify duration, image handling (Linux/docker images), and various launch modes (entrypoint/args, SSH, Jupyter). These pages underpin more specialized tutorials, such as image generation, Stable Diffusion, and Disco Diffusion, by tying practical workloads to the underlying resource model.

A standout portion of the docs covers image generation workflows and templates. The Image Generation guide walks through selecting templates (notably a Stable Diffusion Web UI Forge variant), provisioning scripts, and model management, including environment variables for tokens and the security caveats around sensitive data. The Stable Diffusion page provides a concrete setup path for running text-to-image models, including user authentication, template customization, GPU selection, and best practices for controlling resource usage and persistence. The Disco Diffusion page exists as a deprecated reference, but it is retained to show historical context and links to contemporary Stable Diffusion practices.

Networking and multi-machine workloads are addressed through both orchestration and topology guidance. The Multi-Node Training page explains overlay networks within clusters of machines on the same physical LAN to enable NCCL-based communication across nodes, including rendezvous addresses, environment variables, and example scripts. The Clusters guide outlines how hosts group machines into clusters, register networking subnets, and use CLI commands to create, join, and manage clusters. These sections collectively enable more scalable, distributed AI workloads and training that span multiple machines.

Team collaboration and governance are treated as first-class features. The Teams section describes how multiple users can share resources, manage instances, and consolidate billing. Detailed docs cover team creation, invitations, and a granular permissions system with predefined roles (Owner, Manager, Member) and the ability to craft Custom Roles via a permissions JSON object. The Transfer Team Ownership page explains how ownership can be reassigned within a team. Together, these pages establish a robust framework for collaboration, access control, and cross-member resource management.

Host operations, datacenter status, and hosting economics receive equal emphasis. The Overview for hosts discusses responsibilities around setup, testing, maintenance, and service-level expectations, including the hosting agreement and SLA references. The Datacenter Status page explains how datacenter certifications (ISO27001, etc.) and blue labeling affect search visibility and reliability. The hosting/revenue aspects are complemented by Payment and Taxes guides, which cover payout cycles, invoicing, and tax reporting (including Stripe Connect, W-9 and 1099 forms) to help hosts and contributors understand financial and regulatory requirements.

Operational guidance and verification are interwoven throughout. Verification Stages describe a lifecycle from Unverified to Verified to Deverified, with criteria for both unverified and verified states and notes on random auto-verification for non-datacenter machines. The guide also provides practical testing instructions for hosts, including how to simulate client usage via the CLI and how to extend or manage contracts. The VM and Docker deployment details, along with maintenance and uninstallation notes, round out the operational lifecycle, ensuring hosts can keep their fleets healthy and customers satisfied.

In terms of navigation and structure, the catalog maintains a coherent hierarchy that mirrors the site’s documentation layout: introductory and overview pages, API references, instance and deployment guides, templates and image-related tutorials, networking and clusters content, team and permissions documentation, and financial/verification material. Internal cross-links connect QuickStart, API references, templates, and specific workload guides, while external links are clearly delineated as supplementary references (Postman collections, GitHub repositories, and third-party model sources). The collection is designed for offline use, preserving code blocks, configuration samples, and commands, and it emphasizes preserving relative links and the overall navigation flow.

Key technical concepts you’ll encounter across the pages include: rental contracts and resource allocation models (GPU, CPU, RAM, disk), launch modes and access methods (SSH, Jupyter, API endpoints), template provisioning and environment variables, model management and storage planning, overlay networking for multi-node training, CLI-based testing and management, and a permission-driven approach to team governance. The documentation also provides practical guidance around best practices for workflow management, cost optimization, and data preservation, ensuring readers can deploy reliable, scalable GPU workloads while controlling costs and maintaining security.

Overall, the Vast.ai documentation catalog is a holistic repository that serves both end users renting GPU resources and hosts offering those resources. It ties together how to get started, how to run and manage workloads (from single instances to multi-node clusters), how to template and automate configurations, how to secure access and collaborate as a team, and how to handle the financial and compliance aspects of operating a Vast.ai-based marketplace. The collection equips developers and operators with concrete steps, sample configurations, and strategic guidance to build, run, and scale GPU-powered AI workloads in an ecosystem that blends marketplace economics with distributed computing capabilities.

---

## Page Index

1. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#content-area)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
2. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
3. **[Overview - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/instances)** - See `pages/overview_vast_ai_documentation_affordable_gpu_clou.md`
4. **[Overview - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/serverless)** - See `pages/overview_vast_ai_documentation_affordable_gpu_clou.md`
5. **[Introduction - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/api-reference/introduction)** - See `pages/introduction_vast_ai_documentation_affordable_gpu_.md`
6. **[QuickStart - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/quickstart)** - See `pages/quickstart_vast_ai_documentation_affordable_gpu_cl.md`
7. **[Image Generation - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/image-generation)** - See `pages/image_generation_vast_ai_documentation_affordable_.md`
8. **[Stable Diffusion - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/stable-diffusion)** - See `pages/stable_diffusion_vast_ai_documentation_affordable_.md`
9. **[Disco Diffusion - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/disco-diffusion)** - See `pages/disco_diffusion_vast_ai_documentation_affordable_g.md`
10. **[Teams Overview - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/teams-overview)** - See `pages/teams_overview_vast_ai_documentation_affordable_gp.md`
11. **[Team Creation - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/team-creation)** - See `pages/team_creation_vast_ai_documentation_affordable_gpu.md`
12. **[Teams Invitations - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/teams-invitations)** - See `pages/teams_invitations_vast_ai_documentation_affordable.md`
13. **[Teams Roles - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/teams-roles)** - See `pages/teams_roles_vast_ai_documentation_affordable_gpu_c.md`
14. **[Transfer Team Ownership - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/transfer-team-ownership)** - See `pages/transfer_team_ownership_vast_ai_documentation_affo.md`
15. **[Overview - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/overview)** - See `pages/overview_vast_ai_documentation_affordable_gpu_clou.md`
16. **[Guide to Taxes - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/guide-to-taxes)** - See `pages/guide_to_taxes_vast_ai_documentation_affordable_gp.md`
17. **[Datacenter Status - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/datacenter-status)** - See `pages/datacenter_status_vast_ai_documentation_affordable.md`
18. **[Payment - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/payment)** - See `pages/payment_vast_ai_documentation_affordable_gpu_cloud.md`
19. **[Verification Stages - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/verification-stages)** - See `pages/verification_stages_vast_ai_documentation_affordab.md`
20. **[VMs - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/vms)** - See `pages/vms_vast_ai_documentation_affordable_gpu_cloud_mar.md`
21. **[Clusters - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/clusters)** - See `pages/clusters_vast_ai_documentation_affordable_gpu_clou.md`
22. **[Multi-Node training using Torch + NCCL - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/multi-node-training-using-torch-nccl)** - See `pages/multi_node_training_using_torch_nccl_vast_ai_docum.md`
23. **[Introduction - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/introduction)** - See `pages/introduction_vast_ai_documentation_affordable_gpu_.md`
24. **[Search - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/search)** - See `pages/search_vast_ai_documentation_affordable_gpu_cloud_.md`
25. **[Instances Guide - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/instances-guide)** - See `pages/instances_guide_vast_ai_documentation_affordable_g.md`
26. **[Volumes - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/volumes)** - See `pages/volumes_vast_ai_documentation_affordable_gpu_cloud.md`
27. **[Billing - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/billing)** - See `pages/billing_vast_ai_documentation_affordable_gpu_cloud.md`
28. **[Earning - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/earning)** - See `pages/earning_vast_ai_documentation_affordable_gpu_cloud.md`
29. **[Referral Program - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/referral-program)** - See `pages/referral_program_vast_ai_documentation_affordable_.md`
30. **[Members - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/members)** - See `pages/members_vast_ai_documentation_affordable_gpu_cloud.md`
31. **[Keys - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/keys)** - See `pages/keys_vast_ai_documentation_affordable_gpu_cloud_ma.md`
32. **[Settings - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/settings)** - See `pages/settings_vast_ai_documentation_affordable_gpu_clou.md`
33. **[CLI - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/cli)** - See `pages/cli_vast_ai_documentation_affordable_gpu_cloud_mar.md`
34. **[RTX 5 Series - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/rtx-5-series)** - See `pages/rtx_5_series_vast_ai_documentation_affordable_gpu_.md`
35. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#running-image-generation-on-vast-ai%3A-a-complete-guide)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
36. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#introduction)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
37. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#prerequisites)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
38. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#setting-up-your-environment)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
39. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#1-selecting-the-right-template)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
40. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#2-choosing-an-instance)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
41. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#3-connecting-to-your-instance)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
42. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#working-with-models)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
43. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#managing-models)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
44. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#default-setup)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
45. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#custom-provisioning)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
46. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#model-organization)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
47. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#optimization-tips)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
48. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#performance-settings)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
49. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#batch-processing)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
50. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#memory-management)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
51. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#advanced-features)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
52. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#custom-scripts)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
53. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#extensions-management)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
54. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#api-usage)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
55. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#troubleshooting)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
56. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#common-issues-and-solutions)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
57. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#best-practices)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
58. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#workflow-management)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
59. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#resource-optimization)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
60. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#quality-control)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
61. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#cost-optimization)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
62. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#instance-selection)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
63. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#storage-management)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
64. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#additional-resources)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
65. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/#conclusion)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
66. **[Jupyter - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/instances/jupyter)** - See `pages/jupyter_vast_ai_documentation_affordable_gpu_cloud.md`
67. **[SSH/SCP - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/instances/sshscp)** - See `pages/ssh_scp_vast_ai_documentation_affordable_gpu_cloud.md`
68. **[Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://vast.ai/docs/)** - See `pages/vast_ai_documentation_affordable_gpu_cloud_marketp.md`
69. **[vLLM (LLM inference and serving) - Vast.ai Documentation – Affordable GPU Cloud Marketplace](https://docs.vast.ai/vllm-llm-inference-and-serving)** - See `pages/vllm_llm_inference_and_serving_vast_ai_documentati.md`
